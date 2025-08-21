<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>/* global wpforms_gutenberg_form_selector */
/* jshint es3: false, esversion: 6 */

import PropTypes from 'prop-types';

/**
 * @param strings.remove_image
 */

/**
 * React component for the background preview.
 *
 * @since 1.8.8
 *
 * @param {Object}   props                    Component props.
 * @param {Object}   props.attributes         Block attributes.
 * @param {Function} props.onRemoveBackground Function to remove the background.
 * @param {Function} props.onPreviewClicked   Function to handle the preview click.
 *
 * @return {Object} React component.
 */
const BackgroundPreview = ( { attributes, onRemoveBackground, onPreviewClicked } ) =&gt; {
	const { Button } = wp.components;
	const { strings } = wpforms_gutenberg_form_selector;

	return (
		</p><div classname="wpforms-gutenberg-form-selector-background-preview">
			<style>
				{ `
					.wpforms-gutenberg-form-selector-background-preview-image {
						--wpforms-background-url: ${ attributes.backgroundUrl };
					}
				` }
			</style>
			<input classname="wpforms-gutenberg-form-selector-background-preview-image" onclick="{" onpreviewclicked tabindex="{" type="button" onkeydown="{" event> {
						if ( event.key === 'Enter' || event.key === ' ' ) {
							onPreviewClicked();
						}
					}
				}
			&gt;
			
			<button issecondary classname="is-destructive" onclick="{" onremovebackground>
				{ strings.remove_image }
			</button>
		</div>
	);
};

BackgroundPreview.propTypes = {
	attributes: PropTypes.object.isRequired,
	onRemoveBackground: PropTypes.func.isRequired,
	onPreviewClicked: PropTypes.func.isRequired,
};

export default BackgroundPreview;
</body></html>
