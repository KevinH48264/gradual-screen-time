export const getPopover = ( timeElapsed : number, windDownInterval : number ) => {
    var opacity = timeElapsed / windDownInterval
    console.log("popover was called!")

    // Popover element
    const popover = document.createElement("div");
    popover.style.width = "100%";
    popover.style.height = "100%";
    popover.style.zIndex = "10000000";
    popover.style.backgroundColor = `rgb(0,0,0, ${opacity})`;
    popover.style.position = "fixed";

    popover.style.right = "0";
    popover.style.top = "0";
    popover.style.fontFamily = "Verdana,sans-serif";
    popover.style.color = "rgb(210, 214, 218)";

    popover.style.display = "flex";
    popover.style.alignItems = "center";
    popover.style.justifyContent = "center";
    popover.style.overflow = "hidden";

        //   allowed to click through?
    popover.style.pointerEvents = 'none';

    // standardize fonts
    popover.id = "wind-down-popover";

    return popover;
};