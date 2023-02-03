//@ui5-bundle sap/ui/richtexteditor/library-h2-preload.js
/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.predefine('sap/ui/richtexteditor/library',["sap/ui/thirdparty/jquery",'sap/ui/core/Core','sap/ui/core/library','sap/base/util/ObjectPath'],function(q,C,l,O){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.richtexteditor",dependencies:["sap.ui.core"],types:["sap.ui.richtexteditor.EditorType"],interfaces:["sap.ui.richtexteditor.IToolbar"],controls:["sap.ui.richtexteditor.RichTextEditor","sap.ui.richtexteditor.ToolbarWrapper","sap.ui.richtexteditor.RTESplitButton"],elements:[],version:"1.78.0"});sap.ui.richtexteditor.EditorType={TinyMCE:"TinyMCE",TinyMCE4:"TinyMCE4"};sap.ui.richtexteditor.EditorCommands={Bold:{icon:"bold-text",command:"Bold",style:"bold",bundleKey:"BOLD_BUTTON_TOOLTIP"},Italic:{icon:"italic-text",command:"Italic",style:"italic",bundleKey:"ITALIC_BUTTON_TOOLTIP"},Underline:{icon:"underline-text",command:"Underline",style:"underline",bundleKey:"UNDERLINE_BUTTON_TOOLTIP"},Strikethrough:{icon:"strikethrough",command:"Strikethrough",style:"strikethrough",bundleKey:"STRIKETHROUGH_BUTTON_TOOLTIP"},Copy:{icon:"copy",command:"Copy",bundleKey:"COPY_BUTTON_TOOLTIP"},Cut:{icon:"scissors",command:"Cut",bundleKey:"CUT_BUTTON_TOOLTIP"},Paste:{icon:"paste",command:"Paste",bundleKey:"PASTE_BUTTON_TOOLTIP"},UnorderedList:{icon:"list",command:"InsertUnorderedList",bundleKey:"UNORDERED_LIST_BUTTON_TOOLTIP"},OrderedList:{icon:"numbered-text",command:"InsertOrderedList",bundleKey:"ORDERED_LIST_BUTTON_TOOLTIP"},Outdent:{icon:"outdent",command:"Outdent",bundleKey:"OUTDENT_BUTTON_TOOLTIP"},Indent:{icon:"indent",command:"Indent",bundleKey:"INDENT_BUTTON_TOOLTIP"},Undo:{icon:"undo",command:"Undo",bundleKey:"UNDO_BUTTON_TOOLTIP"},Redo:{icon:"redo",command:"Redo",bundleKey:"REDO_BUTTON_TOOLTIP"},TextAlign:{Left:{icon:"text-align-left",style:"alignleft",bundleKey:"TEXTALIGH_LEFT"},Center:{icon:"text-align-center",style:"aligncenter",bundleKey:"TEXTALIGH_CENTER"},Right:{icon:"text-align-right",style:"alignright",bundleKey:"TEXTALIGH_RIGHT"},Full:{icon:"text-align-justified",style:"alignjustify",bundleKey:"TEXTALIGH_FULL"},bundleKey:"TEXTALIGN_BUTTON_TOOLTIP"},FontFamily:{AndaleMono:{text:"Andale Mono",commandValue:'"andale mono",monospace'},Arial:{text:"Arial",commandValue:"arial, helvetica, sans-serif"},ArialBlack:{text:"Arial Black",commandValue:'"arial black", sans-serif'},BookAntiqua:{text:"Book Antiqua",commandValue:'"book antiqua", palatino, serif'},ComicSansMS:{text:"Comic Sans MS",commandValue:'"comic sans ms", sans-serif'},CourierNew:{text:"Courier New",commandValue:'"courier new", couriret, monospace'},Georgia:{text:"Georgia",commandValue:"georgia, palatino, serif"},Helvetica:{text:"Helvetica",commandValue:'helvetica, arial, sans-serif'},Impact:{text:"Impact",commandValue:"impact, sans-serif"},Symbol:{text:"Symbol",commandValue:'"symbol"'},Tahoma:{text:"Tahoma",commandValue:"tahoma, arial, helvetica, sans-serif"},Terminal:{text:"Terminal",commandValue:"terminal, monaco, monospace"},TimesNewRoman:{text:"Times New Roman",commandValue:'"times new roman", times, sans-serif'},TrebuchetMS:{text:"Trebuchet MS",commandValue:'"trebuchet ms", geneva, sans-serif'},Verdana:{text:"Verdana",commandValue:"verdana, geneva, sans-serif"},Webdings:{text:"Webdings",commandValue:'"webdings"'},Wingings:{text:"Wingings",commandValue:'wingings, "zapf dingbats"'}},FontSize:[8,10,12,14,18,24,36],TextColor:{icon:"text-color",command:"ForeColor",style:"color",defaultValue:"#000000",bundleKey:"TEXT_COLOR_BUTTON_TOOLTIP"},BackgroundColor:{icon:"color-fill",command:"HiliteColor",style:"background-color",defaultValue:"#ffffff",bundleKey:"BACKGROUND_COLOR_BUTTON_TOOLTIP"},InsertImage:{icon:"picture",bundleKey:"IMAGE_BUTTON_TOOLTIP"},InsertLink:{icon:"chain-link",bundleKey:"LINK_BUTTON_TOOLTIP"},Unlink:{icon:"broken-link",command:"unlink",bundleKey:"UNLINK_BUTTON_TOOLTIP"},InsertTable:{icon:"table-view",bundleKey:"TABLE_BUTTON_TOOLTIP"},FormatBlock:{Paragraph:{text:"Paragraph",commandValue:"p",bundleKey:"PARAGRAPH_BUTTON_TEXT"},Heading1:{text:"Heading 1",commandValue:"h1",bundleKey:"HEADING1_BUTTON_TEXT"},Heading2:{text:"Heading 2",commandValue:"h2",bundleKey:"HEADING2_BUTTON_TEXT"},Heading3:{text:"Heading 3",commandValue:"h3",bundleKey:"HEADING3_BUTTON_TEXT"},Heading4:{text:"Heading 4",commandValue:"h4",bundleKey:"HEADING4_BUTTON_TEXT"},Heading5:{text:"Heading 5",commandValue:"h5",bundleKey:"HEADING5_BUTTON_TEXT"},Heading6:{text:"Heading 6",commandValue:"h6",bundleKey:"HEADING6_BUTTON_TEXT"}}};sap.ui.richtexteditor.Accessibility={FontFamily:"FONT_FAMILY_TEXT",FontSize:"FONT_SIZE_TEXT",FormatBlock:"FORMAT_BUTTON_TOOLTIP"};sap.ui.richtexteditor.ButtonGroups={"font-style":["Bold","Italic","Underline","Strikethrough"],"text-align":["TextAlign"],"formatselect":["FormatBlock"],"font":["FontFamily","FontSize","TextColor","BackgroundColor"],"structure":["UnorderedList","OrderedList","Outdent","Indent"],"link":["InsertLink","Unlink"],"insert":["InsertImage"],"undo":["Undo","Redo"],"clipboard":["Cut","Copy","Paste"],"custom":[]};var s=function(){sap.ui.require(["sap/m/MenuItem","sap/m/Button","sap/m/OverflowToolbarButton","sap/m/OverflowToolbarToggleButton","sap/m/SplitButton","sap/m/MenuButton","sap/m/Menu","sap/m/Select","sap/m/ToolbarSeparator","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/m/Dialog","sap/m/Label","sap/m/CheckBox","sap/m/Input","sap/m/HBox","sap/m/VBox","sap/m/Text","sap/m/StepInput","sap/ui/core/InvisibleText","sap/m/ColorPalettePopover"],function(m,B,o,c,S,M,d,e,t,f,g,D,L,h,i,H,v,T,j,I,k){sap.ui.richtexteditor.RichTextEditorHelper.bSapMLoaded=true;_.Button=B;_.OverflowToolbarButton=o;_.OverflowToolbarToggleButton=c;_.SplitButton=S;_.MenuButton=M;_.Menu=d;_.Select=e;_.ToolbarSeparator=t;_.OverflowToolbar=f;_.OverflowToolbarLayoutData=g;_.MenuItem=m;_.Dialog=D;_.Label=L;_.CheckBox=h;_.Input=i;_.HBox=H;_.VBox=H;_.Text=T;_.StepInput=j;_.InvisibleText=I;_.ColorPalettePopover=k;});};var _={};var a=function(c,S){if(_[c]){return new _[c](S);}};O.set("sap.ui.richtexteditor.RichTextEditorHelper",{bSapMLoaded:false,createOverflowToolbar:function(i,c){return a("OverflowToolbar",{id:i,content:c});},createInvisibleText:function(c){return a("InvisibleText",c);},createButton:function(c){c.type=sap.m.ButtonType.Transparent;return a("Button",c);},createOverflowToolbarButton:function(c){c.type=sap.m.ButtonType.Transparent;return a("OverflowToolbarButton",c);},createSplitButton:function(c){c.type=sap.m.ButtonType.Default;return a("SplitButton",c);},createOverflowToolbarToggleButton:function(c){c.type=sap.m.ButtonType.Transparent;return a("OverflowToolbarToggleButton",c);},createMenuButton:function(i,I,f,c,t){return a("MenuButton",{layoutData:a("OverflowToolbarLayoutData",{priority:sap.m.OverflowToolbarPriority.NeverOverflow}),type:sap.m.ButtonType.Transparent,id:i,menu:a("Menu",{itemSelected:f,items:I}),icon:c,tooltip:t});},createMenuItem:function(i,t,I){return a("MenuItem",{id:i,icon:I,text:t});},createToggleButton:function(c){c.layoutData=a("OverflowToolbarLayoutData",{priority:sap.m.OverflowToolbarPriority.NeverOverflow});c.type=sap.m.ButtonType.Transparent;return a("ToggleButton",c);},createToolbarSeparator:function(){return a("ToolbarSeparator");},createSelect:function(c){return a("Select",c);},createInput:function(c){return a("Input",c);},createLabel:function(c){return a("Label",c);},createCheckBox:function(c){return a("CheckBox",c);},createDialog:function(c){return a("Dialog",c).addStyleClass("sapUiPopupWithPadding");},createText:function(c){return a("Text",c);},createHBox:function(c){return a("HBox",c);},createVBox:function(c){return a("VBox",c);},createStepInput:function(c){return a("StepInput",c);},createColorPalettePopover:function(c){return a("ColorPalettePopover",c);}});if(sap.ui.getCore().getLoadedLibraries()["sap.m"]){s();}else{var b=function(e){var E=e.getParameters();if(E.stereotype==="library"&&E.name==="sap.m"){setTimeout(s.bind(null),0);setTimeout(sap.ui.getCore()['detachLibraryChanged'].bind(sap.ui.getCore(),b),0);}};sap.ui.getCore().attachLibraryChanged(b);}return sap.ui.richtexteditor;});
sap.ui.require.preload({
	"sap/ui/richtexteditor/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.ui.richtexteditor","type":"library","embeds":[],"applicationVersion":{"version":"1.78.0"},"title":"A rich text editor (RTE) control.","description":"A rich text editor (RTE) control. Requires installation of an additional rich text editor library.","ach":"CA-UI5-CTR-RIL","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_belize","sap_belize_hcb","sap_belize_hcw","sap_belize_plus","sap_bluecrystal","sap_fiori_3","sap_fiori_3_dark","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.78","libs":{"sap.ui.core":{"minVersion":"1.78.0"}}},"library":{"i18n":{"bundleUrl":"messagebundle.properties","supportedLocales":["","ar","bg","ca","cs","da","de","el","en","en-US-sappsd","en-US-saptrc","es","et","fi","fr","hi","hr","hu","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh-CN","zh-TW"]},"content":{"controls":["sap.ui.richtexteditor.RichTextEditor","sap.ui.richtexteditor.ToolbarWrapper","sap.ui.richtexteditor.RTESplitButton"],"elements":[],"types":["sap.ui.richtexteditor.EditorType"],"interfaces":["sap.ui.richtexteditor.IToolbar"]}}}}'
},"sap/ui/richtexteditor/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ui/richtexteditor/RTESplitButton.js":["sap/m/SplitButton.js","sap/ui/richtexteditor/RTESplitButtonRenderer.js"],
"sap/ui/richtexteditor/RTESplitButtonRenderer.js":["sap/m/SplitButtonRenderer.js","sap/ui/core/Renderer.js"],
"sap/ui/richtexteditor/RichTextEditor.js":["sap/base/Log.js","sap/base/security/encodeXML.js","sap/base/security/sanitizeHTML.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/Core.js","sap/ui/core/RenderManager.js","sap/ui/core/ResizeHandler.js","sap/ui/dom/includeScript.js","sap/ui/dom/jquery/Selectors.js","sap/ui/dom/jquery/control.js","sap/ui/events/KeyCodes.js","sap/ui/richtexteditor/RichTextEditorRenderer.js","sap/ui/richtexteditor/ToolbarWrapper.js","sap/ui/richtexteditor/library.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/richtexteditor/RichTextEditorRenderer.js":["sap/ui/core/Renderer.js"],
"sap/ui/richtexteditor/ToolbarWrapper.js":["sap/base/Log.js","sap/base/security/URLWhitelist.js","sap/ui/core/Control.js","sap/ui/core/Core.js","sap/ui/core/IconPool.js","sap/ui/core/Item.js","sap/ui/richtexteditor/RTESplitButton.js","sap/ui/richtexteditor/ToolbarWrapperRenderer.js","sap/ui/richtexteditor/library.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/richtexteditor/ToolbarWrapperRenderer.js":["sap/ui/core/Renderer.js"],
"sap/ui/richtexteditor/library.js":["sap/base/util/ObjectPath.js","sap/ui/core/Core.js","sap/ui/core/library.js","sap/ui/thirdparty/jquery.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map