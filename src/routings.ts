import { ComponentRouting } from "types/global";

export const __routing_params__:any = function (routing:ComponentRouting, routingPath:string):any {
    let standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)"); //allowing {param}
    return {
        ...[...routingPath.matchAll((new RegExp(standardRoutingPath, "g")))][0]["groups"]
    };
};

export const __valid_routings__ = function (routings:ComponentRouting[], routingPath:string):ComponentRouting[] {
    return routings.filter(function (routing) {
        var standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
        return (new RegExp(standardRoutingPath, "g")).test(routingPath);
    }).reverse();
};
export const __valid_routing_way__ = function (validRoutingWays:string[], routingWay:string) {
    return validRoutingWays.includes(routingWay);
};
