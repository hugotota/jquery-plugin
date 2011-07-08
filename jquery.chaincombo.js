(function($) {
   $.fn.comboboxChain = function(config) {
     var defaultconfig = {
		 label: "label",
		 value: "value",
		 paramName: "id",
		 targetId: "target"
    };

    settings = $.extend({}, defaultconfig, config);

     this.each(function() {
    	 var $cb = $(this);
    	 var $ie = $.browser.msie;
    	 var target = document.getElementById(settings.targetId);
    	 var data = settings.paramName.concat('=').concat($cb.val());

    	 $cb.change(function() {
            $.ajax({
                url: settings.url,
        		global: false,
        		async: false,
                data: data,
        		type: "GET",
        		dataType: "json",
                success: function(json) {
                    var options = [];
                    for (var idx = 0; idx < json.length; idx++) {
                        var opt = new Option(json[idx][settings.label], json[idx][settings.value]);
                        if ($ie) {
                        	target.options[idx] = opt;
                        } else {
                        	options[idx] = opt;
                        }
                    }
                    if (!$ie) { $("#".concat(settings.targetId)).html(options); }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                	alert('Error on ajax request. \n\nerror: ' + errorThrown);
                }
            });
    	 });
    	 return this;
     });
   };
})(jQuery);