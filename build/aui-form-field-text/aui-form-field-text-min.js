YUI.add("aui-form-field-text",function(e,t){var n=e.getClassName("form","builder","field","text"),r=e.getClassName("form","builder","field","text","content"),i=e.getClassName("form","builder","field","text","input"),s='<textarea class="'+i+' form-control" rows="3">',o='<input type="text" class="'+i+' form-control">';e.FormFieldText=e.Base.create("form-field-text",e.FormField,[e.FormFieldRequired],{TPL_FIELD_CONTENT:'<div class="'+r+'"></div>',initializer:function(){this._uiSetPlaceholder(this.get("placeholder")),this.after({placeholderChange:this._afterPlaceholderChange,typeChange:this._afterTypeChange})},renderUI:function(){var t=this.get("content");e.FormFieldText.superclass.renderUI.call(this),t.addClass(n),this._uiSetType(this.get("type"))},_afterPlaceholderChange:function(){this._uiSetPlaceholder(this.get("placeholder"))},_afterTypeChange:function(){this._uiSetType(this.get("type"))},_uiSetPlaceholder:function(e){var t=this.get("content").one("."+i);t.setAttribute("placeholder",e)},_uiSetType:function(e){var t=this.get("content").one("."+r);t.empty();switch(e){case 0:t.append(o);break;case 1:t.append(s)}this._uiSetPlaceholder(this.get("placeholder"))}},{ATTRS:{name:{validator:e.Lang.isString,value:""},placeholder:{validator:e.Lang.isString,value:""},type:{validator:e.Lang.isNumber,value:0}}})},"3.1.0-deprecated.12",{requires:["aui-form-field-required"],skinnable:!0});
