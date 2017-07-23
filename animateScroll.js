
/*!
MIT License


Copyright (c) 2017 Utkan AKTAŞ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
;(function($, window, document, undefined){
	"use strict";
	/*CONSTANTS*/
	var _default = {
			onStep:function(progress, remaining){
					
			},
			onStart : function($element, position){
				//position === scrollTop value of element before starting animate
				//element === element wrapped by jQuery
				
			},
			complete : function(){
				
			},
			duration:500,
		},
		_plugin = "animateScroll";
	
	function PLUGIN(element, position, duration, options){
		this.element = element;
		this._default = _default;
		this.settings = $.extend({},_default, options);
		
		this.settings.duration = duration || this.settings.duration;
		this.settings.position = position;

		this.init();
		
		
		
	}
	
	$.extend(PLUGIN.prototype, {
		init:function(){
			var tag;

			//check it is window or document
			if(this.element === window || this.element === document){
				
				tag = "HTML";
			}else{
				tag = this.element.tagName;	
			}
			

			if(tag && typeof tag === "string"){
				tag = tag.toUpperCase();
			}else{
				return false;
			}
			//check html or body
			if(tag === "HTML" || tag === "BODY"){
				tag = this.checkHtmlOrBody();
			}
			
			this.animateIt(tag);
			
		},
		animateIt : function(tag){
			var trg = this.settings.position,
				$el = $(tag),
				self = this,
				curPos,
				duration = this.settings.duration;
				
				curPos = $el.scrollTop();
				
				this.settings.onStart( $el, curPos );
			$el.animate({"scrollTop" : trg},{
				duration:duration,
				progress:function(elem, progress, remaining){
					self.settings.onStep(progress, remaining);
				},
				complete: self.settings.complete
			});
		},
		checkHtmlOrBody : function(){
			var html_,
				scTop;
				
			html_ = document.documentElement;

			
			scTop = html_.scrollTop;
			html_.scrollTop +=1;
			

			
			if(scTop !== html_.scrollTop){
				html_.scrollTop -=1;
				return "HTML";
			}
			
			return "BODY";
			
			
		},
		getCurrentScroll : function( element ){			
			if(element === document){				
				return document.documentElement.scrollTop;
			}
			if(element === window){
				return typeof window.pageYOffset !==undefined? window.pageYOffset : document.documentElement.scrollTop;
			}
			return element.scrollTop;
		},
		
	} );
	
	
	$.fn[ _plugin ] = function(position, duration, options){
		
		if(typeof position === undefined){
			return this;
		}
		
		if(typeof duration !== "number"){
			//check duration is an object
			if(duration === Object(duration) && Object.prototype.toString.call(duration) !== '[object Array]'){
				options = duration;
				duration = null;
			}else{
				duration = null;
			}
		}else{
			duration = parseInt(duration, 10);
		}
		
		options = options || {};
		
		
		
		
		return this.each(function(){
			
			new PLUGIN(this, position, duration, options);
		});

	};

})(jQuery, window, document);
