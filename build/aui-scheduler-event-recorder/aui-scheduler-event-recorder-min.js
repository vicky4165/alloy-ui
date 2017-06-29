YUI.add("aui-scheduler-event-recorder",function(e,t){var n=e.Lang,r=n.isObject,i=n.isString,s=n.isUndefined,o=e.IO.prototype._serialize,u=e.DataType.DateMath,a=e.getClassName,f=a("form","control"),l=a("scheduler-event"),c=a("scheduler-event","recorder"),h=a("scheduler-event","recorder","content"),p=a("scheduler-event","recorder","popover"),d='<form class="scheduler-event-recorder-form" id="schedulerEventRecorderForm"></form>',v='<input type="hidden" name="startDate" value="{startDate}" /><input type="hidden" name="endDate" value="{endDate}" /><label class="scheduler-event-recorder-date">{date}</label>',m='<input class="'+[h,f].join(" ")+'" name="content" value="{content}" />',g=e.Component.create({NAME:"scheduler-event-recorder",ATTRS:{allDay:{value:!1},content:{},duration:{value:60},dateFormat:{validator:i,value:"%a, %B %d"},event:{},popover:{setter:"_setPopover",validator:r,value:{}},strings:{value:{},setter:function(t){return e.merge({"delete":"Delete","description-hint":"e.g., Dinner at Brian's",cancel:"Cancel",description:"Description",edit:"Edit",save:"Save",when:"When"},t||{})},validator:r},bodyTemplate:{value:v},headerTemplate:{value:m}},EXTENDS:e.SchedulerEvent,prototype:{initializer:function(){var t=this;t.get("node").addClass(c),t.publish("cancel",{defaultFn:t._defCancelEventFn}),t.publish("delete",{defaultFn:t._defDeleteEventFn}),t.publish("edit",{defaultFn:t._defEditEventFn}),t.publish("save",{defaultFn:t._defSaveEventFn}),t.after("eventChange",t._afterEventChange),t.after("schedulerChange",t._afterSchedulerChange),t.popover=new e.Popover(t.get("popover")),t.popover.after("visibleChange",e.bind(t._afterPopoverVisibleChange,t))},getContentNode:function(){var e=this,t=e.popover.get("boundingBox");return t.one("."+h)},getFormattedDate:function(){var e=this,t=e.get("event")||e,n=t.get("endDate"),r=t.get("startDate"),i=t._formatDate(r,e.get("dateFormat"));if(t.get("allDay"))return i;i=i.concat(",");var s=t.get("scheduler"),o=s.get("activeView").get("isoTime")?u.toIsoTimeString:u.toUsTimeString;return[i,o(r),"-",o(n)].join(" ")},getTemplateData:function(){var e=this,t=e.get("strings"),n=e.get("event")||e,r=n.get("content");return s(r)&&(r=t["description-hint"]),{content:r,date:e.getFormattedDate(),endDate:n.get("endDate").getTime(),startDate:n.get("startDate").getTime()}},getUpdatedSchedulerEvent:function(t){var n=this,r=n.get("event"),i={silent:!r},s=n.serializeForm();return r||(r=n.clone()),r.set("scheduler",n.get("scheduler"),{silent:!0}),r.setAttrs(e.merge(s,t),i),r},hidePopover:function(){var e=this;e.popover.hide()},populateForm:function(){var t=this,n=t.get("bodyTemplate"),r=t.get("headerTemplate"),i=t.getTemplateData();t.popover.setStdModContent("body",e.Lang.sub(n,i)),t.popover.setStdModContent("header",e.Lang.sub(r,i)),t.popover.addToolbar(t._getFooterToolbar(),"footer")},serializeForm:function(){var t=this;return e.QueryString.parse(o(t.formNode.getDOM()))},showPopover:function(t){var n=this,r=n.get("event");n.popover.get("rendered")||n._renderPopover(),t||(r?t=r.get("node"):t=n.get("node")),e.Lang.isNodeList(t)&&(t=t.item(0));var i=n.popover.get("align");n.popover.set("align",{node:t,points:i.points}),n.popover.show()},_afterEventChange:function(){var e=this;e.populateForm()},_afterPopoverVisibleChange:function(e){var t=this;if(e.newVal){t.populateForm();if(!t.get("event")){var n=t.getContentNode();n&&setTimeout(function(){n.selectText()},0)}}else t.set("event",null,{silent:!0}),t.get("node").remove()},_afterSchedulerChange:function(t){var n=this,r=t.newVal,i=r.get("boundingBox");i.delegate("click",e.bind(n._onClickSchedulerEvent,n),"."+l)},_defCancelEventFn:function(){var e=this;e.get("node").remove(),e.hidePopover()},_defDeleteEventFn:function(){var e=this,t=e.get("scheduler");t.removeEvents(e.get("event")),e.hidePopover(),t.syncEventsUI()},_defEditEventFn:function(){var e=this,t=e.get("scheduler");e.hidePopover(),t.syncEventsUI()},_defSaveEventFn:function(e){var t=this,n=t.get("scheduler");n.addEvents(e.newSchedulerEvent),t.hidePopover(),n.syncEventsUI()},_getFooterToolbar:function(){var t=this,n=t.get("event"),r=t.get("strings"),i=[{label:r.save,on:{click:e.bind(t._handleSaveEvent,t)}},{label:r.cancel,on:{click:e.bind(t._handleCancelEvent,t)}}];return n&&i.push({label:r["delete"],on:{click:e.bind(t._handleDeleteEvent,t)}}),[i]},_handleCancelEvent:function(e){var t=this;t.fire("cancel"),e.domEvent&&e.domEvent.preventDefault(),e.preventDefault()},_handleClickOutSide:function(){var e=this;e.fire("cancel")},_handleDeleteEvent:function(e){var t=this;t.fire("delete",{schedulerEvent:t.get("event")}),e.domEvent&&e.domEvent.preventDefault(),e.preventDefault()},_handleEscapeEvent:function(t){var n=this;n.popover.get("rendered")&&t.keyCode===e.Event.KeyMap.ESC&&(n.fire("cancel"),t.preventDefault())},_handleSaveEvent:function(e){var t=this,n=t.get("event")?"edit":"save";t.fire(n,{newSchedulerEvent:t.getUpdatedSchedulerEvent()}),e.domEvent&&e.domEvent.preventDefault(),e.preventDefault()},_onClickSchedulerEvent:function(e){var t=this,n=e.currentTarget.getData("scheduler-event");n&&(t.set("event",n,{silent:!0}),t.showPopover(e.currentTarget),t.get("node").remove())},_onSubmitForm:function(e){var t=this;t._handleSaveEvent(e)},_renderPopover:function(){var t=this,n=t.get("scheduler"),r=n.get("boundingBox");t.popover.render(r),t.formNode=e.Node.create(d),t.formNode.on("submit",e.bind(t._onSubmitForm,t)),t.popover.get("boundingBox").addClass(p),t.popover.get("contentBox").wrap(t.formNode),r.on("clickoutside",e.bind(t._handleClickOutSide,t))},_setPopover:function(t){var n=this;return e.merge({align:{points:[e.WidgetPositionAlign.BC,e.WidgetPositionAlign.TC]},bodyContent:v,constrain:!0,headerContent:m,preventOverlap:!0,position:"top",toolbars:{footer:n._getFooterToolbar()},visible:!1,zIndex:500},t)}}});e.SchedulerEventRecorder=g},"3.1.0-deprecated.12",{requires:["querystring","io-form","overlay","aui-scheduler-base","aui-popover"],skinnable:!0});
