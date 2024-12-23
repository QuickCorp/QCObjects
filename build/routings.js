"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__valid_routing_way__ = exports.__valid_routings__ = exports.__routing_params__ = void 0;
const __routing_params__ = (routing, routingPath) => {
    const standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)"); // allowing {param}
    return {
        ...[...routingPath.matchAll((new RegExp(standardRoutingPath, "g")))][0].groups
    };
};
exports.__routing_params__ = __routing_params__;
const __valid_routings__ = function (routings, routingPath) {
    return routings.filter(function (routing) {
        const standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
        return (new RegExp(standardRoutingPath, "g")).test(routingPath);
    }).reverse();
};
exports.__valid_routings__ = __valid_routings__;
const __valid_routing_way__ = (validRoutingWays, routingWay) => {
    return validRoutingWays.includes(routingWay);
};
exports.__valid_routing_way__ = __valid_routing_way__;
