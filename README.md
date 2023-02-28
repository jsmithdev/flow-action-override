# Flow Action Override

Override an Action with a Flow

There's an underlying LWC to handle dynamically viewing screen flows but to override a standard action, we still need to use Aura and can't pass in arbitrary data like a flow name so set the Flow's API Name in the Aura Component that wraps the LWC.

To set a Flow API Name you can default in the cmp file:

[force-app/main/default/aura/flowActionOverride/flowActionOverride.cmp](./force-app/main/default/aura/flowActionOverride/flowActionOverride.cmp)

```html
<!-- Can default flowApiName below -->
<aura:attribute name="flowApiName" type="String" default="New_Account_Flow" />
```

Or to set a Flow API Name based on something like the sobject type to make it more dynamic, you can edit the onInit function in the controller file:
[force-app/main/default/aura/flowActionOverride/flowActionOverrideController.js](./force-app/main/default/aura/flowActionOverride/flowActionOverrideController.js)

```js
// Set Flow API Name
// if flow api name not already set in cmp file
if(!component.get('v.flowApiName')){
    // set the flow name based on the sobject type
    if(component.get('v.sObjectName') == 'Contact'){
        component.set("v.flowApiName", 'New_Contact_Flow');
    }
    else {
        // set flow name to default / catch all
        component.set("v.flowApiName", 'New_Account_Flow');
    }
}
```

Screenshot of setting the override of an sobject's New button

![img](./docs/Screenshot%20from%202023-02-28%2001-53-38.png)