import * as utils from '../common/utils';
import vector     from '../common/vector';
import Line       from '../geometry/Line';
import Point      from '../geometry/Point';
import CellView   from './CellView';

class LinkView extends CellView {

    render() {

        let that = this;
        let vel = that.vel;

        vel.empty();

        that.renderMarkup();

        return that.update();
    }

    update() {
        return this
            .updateAttributes()
            .parseRouter()
            .parseConnection()
            .updateMarker()
            .updateConnector();
    }

    updateAttributes() {

        let that = this;

        utils.forIn(that.cell.attrs, function (attrs, selector) {

            let processed = [];

            if (utils.isObject(attrs.fill)) {

                that.applyGradient(selector, 'fill', attrs.fill);
                processed.push('fill');
            }

            if (utils.isObject(attrs.stroke)) {

                that.applyGradient(selector, 'stroke', attrs.stroke);
                processed.push('stroke');
            }

            if (utils.isObject(attrs.filter)) {

                that.applyFilter(selector, attrs.filter);
                processed.push('filter');
            }

            // remove processed special attributes from attrs
            let surplus = {};

            utils.forIn(attrs, function (value, key) {
                if (!utils.contains(processed, key)) {
                    surplus[key] = value;
                }
            });

            that.applyAttrs(selector, surplus);
        });

        return that;
    }

    parseRouter() {

        let that = this;
        let link = that.cell;
        let router = link.getRouter();
        let vertices = link.vertices || [];

        let parser = that.paper.getRouter(router.name);

        link.routerPoints = parser && utils.isFunction(parser)
            ? parser.call(that, vertices, router.options || {})
            : vertices;

        return that;
    }

    parseConnection() {

        let that = this;
        let link = that.cell;

        that.connector = link.getConnector();
        that.sourceMarker = link.getMarker(true);
        that.targetMarker = link.getMarker(false);

        that.connectorStrokeWidth = that.getStrokeWidth(that.connector.selector);
        that.sourceMarkerStrokeWidth = that.getStrokeWidth(that.sourceMarker.selector);
        that.targetMarkerStrokeWidth = that.getStrokeWidth(that.targetMarker.selector);


        let options = that.sourceMarker.options;

        options.connectorStrokeWidth = that.connectorStrokeWidth;
        options.markerStrokeWidth = that.sourceMarkerStrokeWidth;

        options = that.targetMarker.options;
        options.connectorStrokeWidth = that.connectorStrokeWidth;
        options.markerStrokeWidth = that.targetMarkerStrokeWidth;

        return that;
    }

    updateMarker() {

        let that = this;
        let sourceMarkerMeta = that.renderMarker(true);
        let targetMarkerMeta = that.renderMarker(false);

        that.updateConnectionPoint(true, sourceMarkerMeta && sourceMarkerMeta.rad || 0);
        that.updateConnectionPoint(false, targetMarkerMeta && targetMarkerMeta.rad || 0);

        if (sourceMarkerMeta) {
            that.transformMarker(true, sourceMarkerMeta.point)
        }

        if (targetMarkerMeta) {
            that.transformMarker(false, targetMarkerMeta.point);
        }

        return that;
    }

    updateConnector() {

        let that = this;
        let link = that.cell;
        let connector = that.connector;
        let connectorFn = that.paper.getConnector(connector.name);

        if (connectorFn && utils.isFunction(connectorFn)) {

            let pathData = connectorFn(
                link.sourcePoint,
                link.targetPoint,
                link.routerPoints,
                connector.options || {}
            );

            that.applyAttrs(connector.selector, { d: pathData });

        } else {
            throw new Error('Unknown connector: "' + connectorName + '"');
        }

        return that;
    }

    getStrokeWidth(selector) {

        let vel = this.findOne(selector);

        if (vel && vel.node) {

            let sw = utils.getComputedStyle(vel.node, 'stroke-width');

            return sw && utils.toFloat(sw) || 0;
        }

        return 0;
    }

    getTerminalOuterBox(isSource, rad) {

        let that = this;
        let terminalView = that.paper.getTerminalView(that.cell, isSource);

        if (terminalView) {

            let bbox = terminalView.getStrokeBBox();
            let markerStrokeWidth = isSource
                ? that.sourceMarkerStrokeWidth
                : that.targetMarkerStrokeWidth;

            if (markerStrokeWidth) {

                rad = rad || 0;

                if (rad >= Math.PI / 4) {
                    bbox.grow(markerStrokeWidth / 2);
                } else {
                    bbox.grow(markerStrokeWidth / Math.cos(rad));
                }
            }

            return bbox;
        }
    }

    updateConnectionPoint(isSource, rad) {

        // find the connection point on the terminal

        let that = this;
        let link = that.cell;
        let terminalOuterBox = that.getTerminalOuterBox(isSource, rad);
        let connectionPoint;

        if (terminalOuterBox) {

            let vertices = link.routerPoints;
            let reference = isSource ? vertices[0] : vertices[vertices.length - 1];

            if (!reference) {

                let referenceOuterBox = that.getTerminalOuterBox(!isSource);

                if (referenceOuterBox) {

                    reference = referenceOuterBox.intersectionWithLineFromCenterToPoint(terminalOuterBox.getCenter());
                    reference = reference || terminalOuterBox.getCenter();
                }
            }

            if (!reference) {
                reference = isSource ? link.targetPoint : link.sourcePoint;
            }

            if (reference) {
                connectionPoint = terminalOuterBox.intersectionWithLineFromCenterToPoint(reference);
            }

            connectionPoint = connectionPoint || terminalOuterBox.getCenter();

            if (isSource) {
                link.sourcePoint = connectionPoint;
            } else {
                link.targetPoint = connectionPoint;
            }

            link[isSource ? 'sourcePoint' : 'targetPoint'] = connectionPoint;
        }

        return that;
    }

    renderMarker(isSource) {

        let that = this;
        let marker = isSource ? that.sourceMarker : that.targetMarker;
        let vMarker = that.findOne(marker.selector);

        if (marker && vMarker) {

            // cache the marker vector element
            if (isSource) {
                that.sourceMarkerVel = vMarker;
            } else {
                that.targetMarkerVel = vMarker;
            }


            let renderer = that.paper.getMarker(marker.name);

            if (renderer && utils.isFunction(renderer)) {
                return renderer(vMarker, marker.options);
            }
        }
    }

    transformMarker(isSource, connectionPoint) {

        let that = this;
        let link = that.cell;
        let drawPane = that.paper.drawPane;
        let sourcePoint = link.sourcePoint;
        let targetPoint = link.targetPoint;
        let routerPoints = link.routerPoints;

        let startPoint = isSource ? sourcePoint : targetPoint;
        let endPoint = isSource
            ? (routerPoints[0] || targetPoint)
            : (routerPoints[routerPoints.length - 1] || sourcePoint);

        // make the marker at the right position
        let vMarker = isSource ? that.sourceMarkerVel : that.targetMarkerVel;
        vMarker.translateAndAutoOrient(startPoint, endPoint, drawPane);

        // update the connection point on the marker
        let p = vector.createSVGPoint(connectionPoint.x, connectionPoint.y);
        p = p.matrixTransform(vMarker.node.getTransformToElement(drawPane));

        let newPoint = Point.fromPoint(p);

        if (isSource) {
            link.sourcePoint = newPoint;
        } else {
            link.targetPoint = newPoint;
        }
    }
}


// exports
// -------

export default LinkView;
