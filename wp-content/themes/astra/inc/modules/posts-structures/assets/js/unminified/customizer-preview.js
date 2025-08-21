<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>/**
 * This file adds some LIVE to the Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 *
 * @package Astra
 * @since x.x.x
 */

function astra_dynamic_build_css( addon, control, css_property, selector, unitSupport = false ) {
	var tablet_break_point    = AstraPostStrcturesData.tablet_break_point || 768,
		mobile_break_point    = AstraPostStrcturesData.mobile_break_point || 544,
		unitSuffix = unitSupport || '';

	wp.customize( control, function( value ) {
		value.bind( function( value ) {
			if ( value.desktop || value.mobile || value.tablet ) {
				// Remove <style> first!
				control = control.replace( '[', '-' );
				control = control.replace( ']', '' );
				jQuery( 'style#' + control + '-dynamic-preview-css' ).remove();

				var DeskVal = '',
					TabletFontVal = '',
					MobileVal = '';

				if ( '' != value.desktop ) {
					DeskVal = css_property + ': ' + value.desktop;
				}
				if ( '' != value.tablet ) {
					TabletFontVal = css_property + ': ' + value.tablet;
				}
				if ( '' != value.mobile ) {
					MobileVal = css_property + ': ' + value.mobile;
				}

				// Concat and append new <style>.
				jQuery( 'head' ).append(
					'<style id="' + control + '-dynamic-preview-css">'
					+ selector + ' { ' + DeskVal + unitSuffix + ' }'
					+ '@media (max-width: ' + tablet_break_point + 'px) {' + selector + ' { ' + TabletFontVal + unitSuffix + ' } }'
					+ '@media (max-width: ' + mobile_break_point + 'px) {' + selector + ' { ' + MobileVal + unitSuffix + ' } }'
					+ '</style>'
				);
			} else {
				jQuery( 'style#' + control + '-' + addon ).remove();
			}
		} );
	} );
}

function astra_refresh_customizer( control ) {
	wp.customize( control, function( value ) {
		value.bind( function( value ) {
			wp.customize.preview.send( 'refresh' );
		} );
	} );
}

( function( $ ) {

	var postTypesCount = AstraPostStrcturesData.post_types.length || false,
		postTypes = AstraPostStrcturesData.post_types || [],
		specialsTypesCount = AstraPostStrcturesData.special_pages.length || false,
		specialsTypes = AstraPostStrcturesData.special_pages || [],
		tablet_break_point    = AstraPostStrcturesData.tablet_break_point || 768,
		mobile_break_point    = AstraPostStrcturesData.mobile_break_point || 544;

	/**
	 * For single layouts.
	 */
	for ( var index = 0; index  *:not(:last-child), body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container &gt; *:not(:last-child), header.entry-header .read-more, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .read-more',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-text-color]',
			'color',
			'header.entry-header *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container *',
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-title-color]',
			'color',
			'header.entry-header .entry-title, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-title',
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-link-color]',
			'color',
			'body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container a, header.entry-header a, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container a *, header.entry-header a *'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-link-hover-color]',
			'color',
			'body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container a:hover, header.entry-header a:hover, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container a:hover *, header.entry-header a:hover *'
		);

		astra_responsive_spacing( 'astra-settings[ast-dynamic-single-' + postType + '-banner-padding]','body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-dynamic-single-' + postType + '-banner-margin]','body .ast-single-entry-banner[data-post-type="' + postType + '"]', 'margin',  ['top', 'right', 'bottom', 'left' ] );

		// Banner - Title.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-' + postType + '-title-font-family]', ' header.entry-header .entry-title, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-title' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-single-' + postType + '-title-font-family]', 'astra-settings[ast-dynamic-single-' + postType + '-title-font-weight]', 'font-weight', ' header.entry-header .entry-title, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-title' );
		astra_css( 'astra-settings[ast-dynamic-single-' + postType + '-title-font-weight]', 'font-weight', ' header.entry-header .entry-title, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-title' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-' + postType + '-title-font-size]', ' header.entry-header .entry-title, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-title' );
		astra_font_extras_css( 'ast-dynamic-single-' + postType + '-title-font-extras', ' header.entry-header .entry-title, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-title' );

		// Banner - Text.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-' + postType + '-text-font-family]', ' header.entry-header *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container *' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-single-' + postType + '-text-font-family]', 'astra-settings[ast-dynamic-single-' + postType + '-text-font-weight]', 'font-weight', ' header.entry-header *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container *' );
		astra_css( 'astra-settings[ast-dynamic-single-' + postType + '-text-font-weight]', 'font-weight', ' header.entry-header *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-' + postType + '-text-font-size]', ' header.entry-header *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container *' );
		astra_font_extras_css( 'ast-dynamic-single-' + postType + '-text-font-extras', ' header.entry-header *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container *' );

		// Banner - Meta.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-family]', ' header.entry-header .entry-meta, header.entry-header .entry-meta *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta *' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-family]', 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-weight]', 'font-weight', ' header.entry-header .entry-meta, header.entry-header .entry-meta *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta *' );
		astra_css( 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-weight]', 'font-weight', ' header.entry-header .entry-meta, header.entry-header .entry-meta *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-size]', ' header.entry-header .entry-meta, header.entry-header .entry-meta *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta *' );
		astra_font_extras_css( 'ast-dynamic-single-' + postType + '-meta-font-extras', ' header.entry-header .entry-meta, header.entry-header .entry-meta *, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta, body .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container .entry-meta *' );
	}

	/**
	 * For archive layouts.
	 */
	for ( var index = 0; index  *:not(:last-child), body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container &gt; *:not(:last-child)',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-text-color]',
			'color',
			'body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container *, ' + layout1BodySelector + ' .ast-archive-description *'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-title-color]',
			'color',
			'body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container h1, ' + layout1BodySelector + ' .ast-archive-description .ast-archive-title, body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container h1 *, ' + layout1BodySelector + ' .ast-archive-description .ast-archive-title *'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-link-color]',
			'color',
			'body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container a, ' + layout1BodySelector + ' .ast-archive-description a, body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container a *, ' + layout1BodySelector + ' .ast-archive-description a *'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-link-hover-color]',
			'color',
			'body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container a:hover, ' + layout1BodySelector + ' .ast-archive-description a:hover, body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container a:hover *, ' + layout1BodySelector + ' .ast-archive-description a:hover *'
		);

		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-custom-bg]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"], ' + layout1BodySelector + ' .ast-archive-description', 'desktop' );
		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-custom-bg]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"], ' + layout1BodySelector + ' .ast-archive-description', 'tablet' );
		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-custom-bg]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"], ' + layout1BodySelector + ' .ast-archive-description', 'mobile' );

		astra_responsive_spacing( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-padding]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"], ' + layout1BodySelector + ' .ast-archive-description', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-margin]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"], ' + layout1BodySelector + ' .ast-archive-description', 'margin',  ['top', 'right', 'bottom', 'left' ] );

		// Banner - Title.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-family]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"] h1, ' + layout1BodySelector + ' .ast-archive-description h1, body .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, ' + layout1BodySelector + ' .ast-archive-description h1 *' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-family]', 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-weight]', 'font-weight', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"] h1, ' + layout1BodySelector + ' .ast-archive-description h1, body .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, ' + layout1BodySelector + ' .ast-archive-description h1 *' );
		astra_css( 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-weight]', 'font-weight', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container h1, ' + layout1BodySelector + ' .ast-archive-description h1, body .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, ' + layout1BodySelector + ' .ast-archive-description h1 *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-size]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container h1, ' + layout1BodySelector + ' .ast-archive-description .ast-archive-title, body .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, ' + layout1BodySelector + ' .ast-archive-description .ast-archive-title *' );
		astra_font_extras_css( 'ast-dynamic-archive-' + postType + '-title-font-extras', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container h1, ' + layout1BodySelector + ' .ast-archive-description .ast-archive-title, body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container h1 *, ' + layout1BodySelector + ' .ast-archive-description h1 *' );

		// Banner - Text.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-family]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"], body .ast-archive-entry-banner[data-post-type="' + postType + '"] *, ' + layout1BodySelector + ' .ast-archive-description, ' + layout1BodySelector + ' .ast-archive-description *' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-family]', 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-weight]', 'font-weight', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"], body .ast-archive-entry-banner[data-post-type="' + postType + '"] *, ' + layout1BodySelector + ' .ast-archive-description, ' + layout1BodySelector + ' .ast-archive-description *' );
		astra_css( 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-weight]', 'font-weight', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"], body .ast-archive-entry-banner[data-post-type="' + postType + '"] *, ' + layout1BodySelector + ' .ast-archive-description, ' + layout1BodySelector + ' .ast-archive-description *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-size]', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"], body .ast-archive-entry-banner[data-post-type="' + postType + '"] *, ' + layout1BodySelector + ' .ast-archive-description, ' + layout1BodySelector + ' .ast-archive-description *' );
		astra_font_extras_css( 'ast-dynamic-archive-' + postType + '-text-font-extras', 'body .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container *, ' + layout1BodySelector + ' .ast-archive-description *' );
	}

	/**
	 * For special pages.
	 */
	for ( var index = 0; index  *:not(:last-child), .search .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container &gt; *:not(:last-child)',
			'px'
		);

		astra_css(
			sectionAstraSettingKey + '-banner-text-color]',
			'color',
			'.search .ast-archive-entry-banner .ast-container *, .search .ast-archive-description *'
		);

		astra_css(
			sectionAstraSettingKey + '-banner-title-color]',
			'color',
			'.search .ast-archive-entry-banner .ast-container h1, .search .ast-archive-description h1, .search .ast-archive-entry-banner .ast-container h1 *, .search .ast-archive-description h1 *'
		);

		astra_css(
			sectionAstraSettingKey + '-banner-link-color]',
			'color',
			selector + ' .ast-container a, ' + '.search .ast-archive-description a, .search .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container a *, ' + '.search .ast-archive-description a *'
		);

		astra_css(
			sectionAstraSettingKey + '-banner-link-hover-color]',
			'color',
			selector + ' .ast-container a:hover, ' + '.search .ast-archive-description a:hover, .search .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container a:hover *, ' + '.search .ast-archive-description a:hover *'
		);

		astra_apply_responsive_background_css( sectionAstraSettingKey + '-banner-custom-bg]', '.search .ast-archive-entry-banner[data-banner-background-type="custom"], .search .ast-archive-description', 'desktop' );
		astra_apply_responsive_background_css( sectionAstraSettingKey + '-banner-custom-bg]', '.search .ast-archive-entry-banner[data-banner-background-type="custom"], .search .ast-archive-description', 'tablet' );
		astra_apply_responsive_background_css( sectionAstraSettingKey + '-banner-custom-bg]', '.search .ast-archive-entry-banner[data-banner-background-type="custom"], .search .ast-archive-description', 'mobile' );

		astra_responsive_spacing( sectionAstraSettingKey + '-banner-padding]', selector + ', ' + '.search .ast-archive-description', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( sectionAstraSettingKey + '-banner-margin]', selector + ', ' + '.search .ast-archive-description', 'margin',  ['top', 'right', 'bottom', 'left' ] );

		// Banner - Title.
		astra_generate_outside_font_family_css( sectionAstraSettingKey + '-title-font-family]', '.search .ast-archive-entry-banner .ast-container h1, .search .ast-archive-description h1, .search .ast-archive-description .ast-archive-title, .search .ast-archive-entry-banner .ast-container h1 *, .search .ast-archive-description h1 *' );
		astra_generate_font_weight_css( sectionAstraSettingKey + '-title-font-family]', sectionAstraSettingKey + '-title-font-weight]', 'font-weight', '.search .ast-archive-entry-banner .ast-container h1, .search .ast-archive-description h1, .search .ast-archive-description .ast-archive-title, .search .ast-archive-entry-banner .ast-container h1 *, .search .ast-archive-description h1 *' );
		astra_css( sectionAstraSettingKey + '-title-font-weight]', 'font-weight',  '.search .ast-archive-entry-banner .ast-container h1, .search .ast-archive-description h1, .search .ast-archive-description .ast-archive-title, .search .ast-archive-entry-banner .ast-container h1 *, .search .ast-archive-description h1 *' );
		astra_responsive_font_size( sectionAstraSettingKey + '-title-font-size]', '.search .ast-archive-entry-banner .ast-container h1, .search .ast-archive-description h1, .search .ast-archive-description .ast-archive-title, .search .ast-archive-entry-banner .ast-container h1 *, .search .ast-archive-description h1 *' );
		astra_font_extras_css( sectionKey + '-title-font-extras', '.search .ast-archive-entry-banner .ast-container h1, .search .ast-archive-description h1, .search .ast-archive-description .ast-archive-title, .search .ast-archive-entry-banner .ast-container h1 *, .search .ast-archive-description h1 *' );

		// Banner - Text.
		astra_generate_outside_font_family_css( sectionAstraSettingKey + '-text-font-family]',  '.search .ast-archive-description *, .search .ast-archive-entry-banner .ast-container *' );
		astra_generate_font_weight_css( sectionAstraSettingKey + '-text-font-family]', sectionAstraSettingKey + '-text-font-weight]', 'font-weight', '.search .ast-archive-description *, .search .ast-archive-entry-banner .ast-container *' );
		astra_css( sectionAstraSettingKey + '-text-font-weight]', 'font-weight', '.search .ast-archive-description *, .search .ast-archive-entry-banner .ast-container *' );
		astra_responsive_font_size( sectionAstraSettingKey + '-text-font-size]', '.search .ast-archive-description *, .search .ast-archive-entry-banner .ast-container *' );
		astra_font_extras_css( sectionKey + '-text-font-extras', '.search .ast-archive-description *, .search .ast-archive-entry-banner .ast-container *' );
	}

} )( jQuery );
</p></body></html>
