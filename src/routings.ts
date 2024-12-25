import {  TComponentRouting } from "types";

export const __routing_params__ = (routing:TComponentRouting, routingPath:string):object => {
    const standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)"); // allowing {param}
    return {
        ...[...routingPath.matchAll((new RegExp(standardRoutingPath, "g")))][0].groups
    };
};

export const __valid_routings__ = function (routings:TComponentRouting[], routingPath:string):TComponentRouting[] {
    return routings.filter(function (routing) {
        const standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
        return (new RegExp(standardRoutingPath, "g")).test(routingPath);
    }).reverse();
};
export const __valid_routing_way__ = (validRoutingWays:string[], routingWay:string):boolean => {
    return validRoutingWays.includes(routingWay);
};
