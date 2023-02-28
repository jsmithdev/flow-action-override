({
    onInit : function(component, event, helper) {

		// Set Flow API Name
		// if flow api name not already set in cmp file
		if(!component.get('v.flowApiName')){
			// set the flow name based on the sobject type
			if(component.get('v.sObjectName') == 'Account'){
				component.set("v.flowApiName", 'New_Account_Flow');
			}
			else {
				// set flow name to default / catch all
				component.set("v.flowApiName", 'New_Account_Flow');
			}
		}

		// Open Modal
        component.find("workspace").isConsoleNavigation().then(function(isConsole) {
            component.set("v.isConsole", isConsole);
            if (isConsole)
                component.find("workspace").getFocusedTabInfo().then(function(tabInfo) {
                    component.set("v.tabId", tabInfo.tabId);
                });
            else
                component.set("v.isOpen", true);
        });
    },
    
    handleCancelled : function(component, event, helper) {
        if (component.get("v.isConsole"))
            component.find("workspace").closeTab({tabId: component.get("v.tabId")});
        else {
            component.set("v.isOpen", false);
            component.find("navService").navigate({    
                type: "standard__objectPage",
                attributes: {
                    objectApiName: component.get("v.sObjectName"),
                    actionName: "home"
                }
            });
        }
    },

    statusChange : function(component, event, helper) {

		const status = event.getParam("status");

		// return if no status
		if(!status) return;

		console.log(JSON.parse(JSON.stringify({
			object: component.get('v.sObjectName'),
			status,
			'v': 1,
		})));


		if (status === "FINISHED" || status === "FINISHED_SCREEN") {

			if (component.get("v.isConsole"))
				component.find("workspace").closeTab({tabId: component.get("v.tabId")});
			else {
				component.set("v.isOpen", false);
				component.find("navService").navigate({    
					type: "standard__objectPage",
					attributes: {
						objectApiName: component.get("v.sObjectName"),
						actionName: "home"
					}
				});
			}
        }
    },
    
    handleError : function(component, event, helper) {
        if (component.get("v.isConsole"))
            component.find("workspace").closeTab({tabId: component.get("v.tabId")});
        else {
            component.set("v.isOpen", false);
            component.find("navService").navigate({    
                type: "standard__objectPage",
                attributes: {
                    objectApiName: component.get("v.sObjectName"),
                    actionName: "home"
                }
            });
        }
        component.find("notifLib").showToast({
            message: "Record was not created.",
            variant: "error",
            mode: "pester"
        });
    }
})