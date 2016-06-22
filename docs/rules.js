let rule = {
    sources: [
        "deviceId",
        "deviceId",
        "deviceId"
    ],
    targets: [
        "deviceId",
        "deviceId"
    ],
    processor: function (sourceIds, targetIds) {
        let sources = initSources(sourceIds);
        let targets = initTargets(targetIds);

        Meteor.subscribe("DataMessage", sourceIds);



};