/**
 * Debug script for drag functionality
 * Run this in console to debug drag issues
 */

export function debugDragFunctionality() {
    console.log('🔍 Debugging drag functionality...');
    
    const rectangle = document.getElementById('rectangle');
    const tabletBoundary = document.getElementById('tablet-boundary');
    const visualContainer = document.getElementById('visual-container');
    
    if (!rectangle) {
        console.error('❌ Rectangle element not found');
        return;
    }
    
    if (!tabletBoundary) {
        console.error('❌ Tablet boundary element not found');
        return;
    }
    
    if (!visualContainer) {
        console.error('❌ Visual container element not found');
        return;
    }
    
    // Check element properties
    console.log('📊 Element Properties:');
    console.log('Rectangle:', {
        id: rectangle.id,
        className: rectangle.className,
        style: {
            cursor: rectangle.style.cursor,
            pointerEvents: rectangle.style.pointerEvents,
            visibility: rectangle.style.visibility,
            opacity: rectangle.style.opacity,
            position: window.getComputedStyle(rectangle).position,
            left: rectangle.style.left,
            top: rectangle.style.top,
            width: rectangle.style.width,
            height: rectangle.style.height,
            zIndex: window.getComputedStyle(rectangle).zIndex
        },
        boundingRect: rectangle.getBoundingClientRect()
    });
    
    console.log('Tablet Boundary:', {
        style: {
            position: window.getComputedStyle(tabletBoundary).position,
            width: tabletBoundary.style.width,
            height: tabletBoundary.style.height
        },
        boundingRect: tabletBoundary.getBoundingClientRect()
    });
    
    console.log('Visual Container:', {
        style: {
            display: window.getComputedStyle(visualContainer).display,
            alignItems: window.getComputedStyle(visualContainer).alignItems,
            justifyContent: window.getComputedStyle(visualContainer).justifyContent
        },
        boundingRect: visualContainer.getBoundingClientRect()
    });
    
    // Check if rectangle is actually visible and clickable
    const rectRect = rectangle.getBoundingClientRect();
    const isVisible = rectRect.width > 0 && rectRect.height > 0;
    const isInViewport = rectRect.top >= 0 && rectRect.left >= 0 && 
                        rectRect.bottom <= window.innerHeight && 
                        rectRect.right <= window.innerWidth;
    
    console.log('🎯 Visibility Check:', {
        hasSize: isVisible,
        inViewport: isInViewport,
        computedVisibility: window.getComputedStyle(rectangle).visibility,
        computedOpacity: window.getComputedStyle(rectangle).opacity,
        computedDisplay: window.getComputedStyle(rectangle).display
    });
    
    // Test event listeners
    console.log('🎧 Testing Event Listeners...');
    
    // Create a test click event
    const testClick = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: rectRect.left + rectRect.width / 2,
        clientY: rectRect.top + rectRect.height / 2
    });
    
    console.log('Dispatching test click event...');
    rectangle.dispatchEvent(testClick);
    
    // Test mousedown event
    const testMouseDown = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        clientX: rectRect.left + rectRect.width / 2,
        clientY: rectRect.top + rectRect.height / 2
    });
    
    console.log('Dispatching test mousedown event...');
    rectangle.dispatchEvent(testMouseDown);
    
    // Check for overlapping elements
    const elementAtPoint = document.elementFromPoint(
        rectRect.left + rectRect.width / 2,
        rectRect.top + rectRect.height / 2
    );
    
    console.log('🎯 Element at rectangle center:', elementAtPoint);
    console.log('Is it the rectangle?', elementAtPoint === rectangle);
    
    if (elementAtPoint !== rectangle) {
        console.warn('⚠️ Another element is covering the rectangle:', elementAtPoint);
    }
    
    // Test context menu
    console.log('🖱️ Testing context menu...');
    const testRightClick = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: rectRect.left + rectRect.width / 2,
        clientY: rectRect.top + rectRect.height / 2
    });
    
    console.log('Dispatching test right-click event...');
    rectangle.dispatchEvent(testRightClick);
    
    // Test drag simulation
    console.log('🧪 Testing drag simulation...');
    const testDragStart = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        clientX: rectRect.left + rectRect.width / 2,
        clientY: rectRect.top + rectRect.height / 2
    });
    
    const testDragMove = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: rectRect.left + rectRect.width / 2 + 10,
        clientY: rectRect.top + rectRect.height / 2 + 10
    });
    
    const testDragEnd = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        clientX: rectRect.left + rectRect.width / 2 + 10,
        clientY: rectRect.top + rectRect.height / 2 + 10
    });
    
    console.log('Simulating drag sequence...');
    rectangle.dispatchEvent(testDragStart);
    setTimeout(() => {
        document.dispatchEvent(testDragMove);
        setTimeout(() => {
            document.dispatchEvent(testDragEnd);
        }, 100);
    }, 100);
    
    return {
        rectangle,
        isVisible,
        isInViewport,
        elementAtPoint,
        isAccessible: elementAtPoint === rectangle
    };
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    window.debugDragFunctionality = debugDragFunctionality;
    // Drag debug script loaded silently
} 