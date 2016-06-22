//Items = new Meteor.Collection('items');

let remote = DDP.connect('http://localhost:3000/');
let ServerAItems = new Meteor.Collection('items', {connection: remote});

Items.allow({
    insert: function () {
        return true;
    }
});

Meteor.methods({
    delete: function () {
        Items.remove({});
    }
});

Items.find().observe({
    added: function (item) {
        console.log('-- local item added--');
        console.log(item);

        var _temp = ServerAItems.findOne({_id: item._id});
        if (!_temp) {
            ServerAItems.insert(item);
        }
    },
    removed: function (item) {
        console.log('-- local item removed--');
        console.log(item);

        // ServerAItems.remove({_id:item._id});
    }
});

if (Meteor.isServer) {

    Meteor.startup(function () {
        remote.subscribe('data_messages' , sourceIds);
    });

    DataMessages.find().observe({
        added: function (item) {
            console.log('-- remote item added--');
            console.log(item);

            var _temp = Items.findOne({_id: item._id});
            if (!_temp) {
                console.log('-- local insert--');
                Items.insert(item);
            }
        }
    });
}
