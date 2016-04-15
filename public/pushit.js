var _pushit = {};
_pushit.url = 'https://ws2.slaask.com';

_pushit.lisentingChannels = {}

var socket = io.connect(_pushit.url);

function Channel(channelName) {
    this.channelName = channelName;

    this.events = {};
};

Channel.prototype.bind = function (event, callback) {
    this.events[event] = callback;
};

_pushit.subscribe = function (channelName)
{
    var channel = new Channel(channelName)
    this.lisentingChannels[channelName] = channel;

    socket.on(channelName, this.callbackBuilder(channel))

    return this.lisentingChannels[channelName];
}

_pushit.callbackBuilder = function (channel)
{
    return function (data)
    {
        var callback = channel.events[data["event"]];
        callback(data.data);
    }
}
