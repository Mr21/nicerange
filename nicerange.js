/*
	NiceRange-HTML5 - 1.0
	https://github.com/Mr21/nicerange-html5
*/

(function($) {

if (MutationObserver = MutationObserver || WebKitMutationObserver)
	new MutationObserver(function(mutations) {
		var i = 0, j, m, n;
		for (; m = mutations[i]; ++i)
			for (j = 0; n = m.addedNodes[j]; ++j)
				if (n.tagName && n.tagName.toLowerCase() === "input" &&
					n.type === "range" && n.classList.contains("nicerange"))
					nicerange_init(0, n);
	}).observe(document, {
	  subtree: true,
	  childList: true
	});

function nicerange_init(i, elRng) {
	var jqCtn, elTxt;

	function setVal() {
		elTxt.value = elRng.value + elRng.dataset.unit;
	}

	jqCtn =
	$("<div>")
		.attr("class", elRng.className)
		.insertBefore(elRng)
		.append(elRng)
	;

	$("<span>")
		.addClass("btn")
		.prependTo(jqCtn)
		.click(function() {
			var op = !jqCtn.hasClass("open");
			jqCtn.toggleClass("open", op);
			if (op)
				setTimeout(function() { elRng.focus(); }, 100);
		})
	;

	elTxt =
	$("<input type='text'/>")
		.addClass("nb")
		.prependTo(jqCtn)
		.change(function() {
			elRng.value = elTxt.value;
			setVal();
			elTxt.blur();
		})
	[0];

	if (elRng.dataset.unit === undefined)
		elRng.dataset.unit = "";

	$(elRng)
		.attr("class", "rng")
		.on("change input", setVal)
		.blur(function() {
			jqCtn.removeClass("open");
		})
	;

	setVal();
}

$.fn.nicerange = function() {
	$.each(this, nicerange_init);
};

$(function() {
	$(".nicerange").nicerange();
});

})(jQuery);
