/*
 * DiscoJuice
 * Author: Andreas Åkre Solberg, UNINETT, andreas.solberg@uninett.no
 * Licence undecided.
 */
if (typeof DiscoJuice == "undefined") var DiscoJuice = {};

function getConfig (title, spentityid, responseurl, feeds, redirectURL) {
	var options, i;
	
	options = {
		"title": "Sign in to <strong>" + title + "</strong>",
		"subtitle": "Select your Provider",
		"disco": {
			"spentityid": spentityid,
			"url": responseurl,
			"stores": ["https://cdn.discojuice.org/store"],
			"writableStore": "https://cdn.discojuice.org/store"
		},
		"cookie": true,
		"country": true,
		"location": true,
		"countryAPI": "https://cdn.discojuice.org/country",
		"discoPath": "https://cdn.discojuice.org/",
		"callback": function (e, djc) {
			var returnto = window.location.href;
			window.location = redirectURL + escape(e.entityID);
		},
		"metadata": []
	};

	
	for(i = 0; i < feeds.length; i++) {
		options.metadata.push("https://cdn.discojuice.org/feeds/" + feeds[i]);
	}
	return options;
}


DiscoJuice.Hosted = {
	
	"getConfig": getConfig,
	"setup": function (target, title, spentityid, responseurl, feeds, redirectURL) {
		var options;

		options = getConfig(title, spentityid, responseurl, feeds, redirectURL);
		
		$(document).ready(function() {
			$(target).DiscoJuice(options);
			// console.log("SETUP completed");
			// console.log(options);
		});
		
	}
};