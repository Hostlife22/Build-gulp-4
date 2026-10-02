# Accessibility

## Implemented

- Native HTML controls expose all six object descriptions outside the canvas, including when WebGL fails.
- Visible focus indicators, a skip link, accessible control names, and selected states.
- Object selection focuses a labeled, nonmodal description region. Closing or Escape restores focus to its initiating control. There is no focus trap; other objects remain selectable.
- Mobile descriptions stay in document flow. Layout wraps and page zoom is not disabled.
- Controls have at least 44px touch targets. Numbered markers and labels supplement color.
- System reduced motion disables ambient movement and makes camera transitions immediate. A separate pause button stops ambient animation.
- Loading, rendering failure, and context-loss messages include usable alternatives.
- Body text uses dark ink or muted text on ivory surfaces; focus uses a dark olive outline.

## Verification and limitations

Automated tests cover keyboard activation, focus restoration, Escape, descriptions, resets, reduced-motion controls, WebGL failure, context loss, and desktop/mobile overflow. Eight browser cases passed in the last run before it was stopped to reduce local CPU load; the two marker/layout cases passed in an earlier run. The final on-demand rendering optimization has passed static checks but has not been rerun in a browser. Primary text contrast is 10.86:1, muted text is 4.66:1, and selected-button text is 6.37:1 for the defined flat backgrounds. Actual browser zoom and assistive-technology verification remain manual follow-ups. These checks do not establish WCAG compliance.

The spatial canvas is inherently visual and does not expose a navigable 3D structure to screen readers. Equivalent object stories are provided in HTML; relative spatial relationships and materials are not fully conveyed. Markers are removed from the keyboard sequence to avoid duplicating the HTML object list. No free camera navigation is provided. Browser tests use Chromium, including mobile emulation, rather than physical phones. Manual testing with screen readers and Safari/Firefox remains recommended. Headless rendering does not measure real-device performance.

## Feedback

Open a repository issue with the affected control, browser, assistive technology (if applicable), and what you expected. Avoid including private information. Accessibility improvements are welcome; no formal conformance claim is made.
