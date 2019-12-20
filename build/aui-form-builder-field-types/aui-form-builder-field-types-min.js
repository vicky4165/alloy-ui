YUI.add("aui-form-builder-field-types",function(e,t){e.FormBuilderFieldTypes=function(){},e.FormBuilderFieldTypes.prototype={initializer:function(){this.after("fieldTypesChange",this._afterFieldTypesChange),this.after("form-builder-field-types-modal:selectFieldType",this._afterSelectFieldType)},destructor:function(){e.Array.each(this.get("fieldTypes"),function(e){e.destroy()}),this.get("fieldTypesModal").destroy()},disableUniqueFieldType:function(e){var t=this.findTypeOfField(e);t.get("unique")&&t.set("disabled",!0)},findTypeOfField:function(e){var t=this.get("fieldTypes"),n;for(n=0;n<t.length;n++)if(e.constructor===t[n].get("fieldClass"))return t[n]},hideFieldsPanel:function(){var e=this.get("fieldTypesModal");e.hide()},registerFieldTypes:function(t){var n=this.get("fieldTypes");t=e.Lang.isArray(t)?t:[t],e.Array.each(t,function(e){n.push(e)}),this.set("fieldTypes",n)},showFieldsPanel:function(){var e=this.get("fieldTypesModal");e.get("rendered")||e.render(),e.show()},unregisterFieldTypes:function(t){var n=this;t=e.Lang.isArray(t)?t:[t],e.Array.each(t,function(e){n._unregisterFieldType(e)}),this.set("fieldTypes",this.get("fieldTypes"))},_afterFieldTypesChange:function(e){this.get("fieldTypesModal").set("fieldTypes",e.newVal)},_afterSelectFieldType:function(e){var t,n=e.fieldType;n.get("disabled")||(t=new(n.get("fieldClass"))(n.get("defaultConfig")),this.showFieldSettingsPanel(t,n.get("label")))},_checkActiveLayoutHasFieldType:function(e){var t,n,r,i,s=this.getActiveLayout().get("rows");for(i=0;i<s.length;i++){n=s[i].get("cols");for(t=0;t<n.length;t++){r=n[t].get("value");if(r&&this._checkListHasFieldType(r,e))return!0}}return!1},_checkListHasFieldType:function(e,t){var n=e.get("fields"),r;for(r=0;r<n.length;r++)if(this._hasFieldType(t,n[r]))return!0;return!1},_hasFieldType:function(e,t){var n,r=t.get("nestedFields");if(t.constructor===e.get("fieldClass"))return!0;for(n=0;n<r.length;n++)if(this._hasFieldType(e,r[n]))return!0;return!1},_setFieldTypes:function(t){for(var n=0;n<t.length;n++)e.instanceOf(t[n],e.FormBuilderFieldType)||(t[n]=new e.FormBuilderFieldType(t[n]));return t},_unregisterFieldType:function(t){var n=this.get("fieldTypes"),r;if(e.Lang.isFunction(t))for(r=n.length-1;r>=0;r--)n[r].get("fieldClass")===t&&this._unregisterFieldTypeByIndex(r);else this._unregisterFieldTypeByIndex(n.indexOf(t))},_unregisterFieldTypeByIndex:function(e){var t=this.get("fieldTypes");e!==-1&&(t[e].destroy(),t.splice(e,1))},_updateUniqueFieldType:function(){var t=this;e.Array.each(t.get("fieldTypes"),function(e){e.get("unique")&&e.set("disabled",t._checkActiveLayoutHasFieldType(e))})},_valueFieldTypesModal:function(){var t=new e.FormBuilderFieldTypesModal({centered:!0,cssClass:"form-builder-modal",draggable:!1,fieldTypes:this.get("fieldTypes"),modal:!0,resizable:!1,visible:!1,zIndex:4});return t.addTarget(this),t}},e.FormBuilderFieldTypes.ATTRS={fieldTypes:{setter:"_setFieldTypes",validator:e.Lang.isArray,value:[]},fieldTypesModal:{valueFn:"_valueFieldTypesModal"}}},"3.1.0-deprecated.72",{requires:["aui-classnamemanager","aui-form-builder-field-types-modal","base","node-base"],skinnable:!0});
