export const __routing_params__ = function (routing, routingPath) {
    let standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)"); //allowing {param}
    return {
        ...[...routingPath.matchAll((new RegExp(standardRoutingPath, "g")))][0]["groups"]
    };
};

export const __valid_routings__ = function (routings, routingPath) {
    return routings.filter(function (routing) {
        var standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
        return (new RegExp(standardRoutingPath, "g")).test(routingPath);
    }).reverse();
};
export const __valid_routing_way__ = function (validRoutingWays, routingWay) {
    return validRoutingWays.includes(routingWay);
};
