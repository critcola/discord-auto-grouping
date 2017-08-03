const Discord = require('discord.js');
const client = new Discord.Client();
const token = '';

// Connect and perform routine maintenance.
client.on('ready', () => {
	console.log('[' + new Date().toISOString() + '] Connected!');
	
	// Set the online status.
	client.user.setStatus('online');
	
	// Order the channels.
	orderChannels();
});

// Trigger on VOICE_STATE_UPDATE events.
client.on('voiceStateUpdate', (oldMember, member) => {
	
	// Check if the user entered a new channel.
	if (member.voiceChannelID) {
		const newChannel = member.guild.channels.get(member.voiceChannelID);
		
		// If the user entered a game channel (prefixed with a game controller unicode emoji), group them into their own channel.
		if (newChannel.name.startsWith(String.fromCodePoint('0x1F3AE'))) {
			newChannel.clone(String.fromCodePoint('0x2501') + ' Group', true)
				.then(createdChannel => {
					createdChannel.edit({
							bitrate: 96000,
							position: newChannel.position + 50,
							userLimit: newChannel.userLimit
						})
						.then(createdChannel => {
							member.setVoiceChannel(createdChannel)
								.then(console.log('[' + new Date().toISOString() + '] Moved user "' + member.user.username + '#' + member.user.discriminator + '" (' + member.user.id + ') to ' + createdChannel.type + ' channel "' + createdChannel.name + '" (' + createdChannel.id + ') at position ' + createdChannel.position))
								.catch(console.error);
						})
						.catch(console.error);
				})
				.catch(console.error);
		}
	}
	
	// Check if the user came from another channel.
	if (oldMember.voiceChannelID) {
		const oldChannel = oldMember.guild.channels.get(oldMember.voiceChannelID);
		
		// Delete the user's now empty temporary channel, if applicable.
		if (oldChannel.name.startsWith(String.fromCodePoint('0x2501') + ' Group') && !oldChannel.members.array().length) {
			oldChannel.delete()
				.then(function() {
					console.log('[' + new Date().toISOString() + '] Deleted ' + oldChannel.type + ' channel "' + oldChannel.name + '" (' + oldChannel.id + ')');
				})
				.catch(console.error);
		}
	}
});

// Reorder channels when one is created.
client.on('channelCreate', function(channel){
	if(!channel.name.startsWith(String.fromCodePoint('0x2501') + ' Group')){
		orderChannels();
	}
});

// Reorder channels when one is deleted.
client.on('channelDelete', function(channel){
	if(!channel.name.startsWith(String.fromCodePoint('0x2501') + ' Group')){
		orderChannels();
	}
});

// Function to reorder channels.
function orderChannels(){
	// Get a list of channels.
	var channelsOrdered = client.channels.array().slice(0);
	
	// Evaluate only voice channels.
	channelsOrdered = channelsOrdered.filter(function(channel) {
		return channel.type == 'voice' && typeof channel.position !== 'undefined';
	});
	
	// Sort channels by their current position.
	channelsOrdered = channelsOrdered.sort(function(channelA, channelB) {
		return channelA.position - channelB.position;
	});
	
	// Re-sort channels to support auto-grouping and maximum voice quality.
	var currentPosition = 100;
	channelsOrdered.forEach(function(channel) {
		currentChannel = client.channels.get(channel.id);
		currentChannel.edit({bitrate: 96000, position: currentPosition})
			.then(editedChannel => {
				console.log('[' + new Date().toISOString() + '] Set ' + editedChannel.type + ' channel "' + editedChannel.name + '" (' + editedChannel.id + ') position to ' + editedChannel.position + ' with ' + editedChannel.bitrate / 1000 + 'kbps bitrate')
			})
			.catch(console.error);
		currentPosition += 100;
	});
}

client.login(token);
