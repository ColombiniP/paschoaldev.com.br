<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>/* global wpforms_divi_builder, WPFormsRepeaterField, ETBuilderBackendDynamic */

import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * WPFormsSelector component.
 *
 * @since 1.6.3
 */
class WPFormsSelector extends Component {

	/**
	 * Module slug.
	 *
	 * @since 1.6.3
	 *
	 * @type {string}
	 */
	static slug = 'wpforms_selector';

	/**
	 * Constructor.
	 *
	 * @since 1.6.3
	 *
	 * @param {string} props List of properties.
	 */
	constructor( props ) {

		super( props );

		this.state = {
			error: null,
			isLoading: true,
			form: null,
		};
	}

	/**
	 * Set types for properties.
	 *
	 * @since 1.6.3
	 *
	 * @returns {object} Properties type.
	 */
	static get propTypes() {

		return {
			form_id: PropTypes.number, // eslint-disable-line camelcase
			show_title: PropTypes.string, // eslint-disable-line camelcase
			show_desc: PropTypes.string, // eslint-disable-line camelcase
		};
	}

	/**
	 * Check if form settings was updated.
	 *
	 * @since 1.6.3
	 *
	 * @param {object} prevProps List of previous properties.
	 */
	componentDidUpdate( prevProps ) {

		if ( prevProps.form_id !== this.props.form_id || prevProps.show_title !== this.props.show_title || prevProps.show_desc !== this.props.show_desc ) {
			this.componentDidMount();
		}
	}

	/**
	 * Ajax request for form HTML.
	 *
	 * @since 1.6.3
	 */
	componentDidMount() {
		const formData = new FormData();

		formData.append( 'nonce', wpforms_divi_builder.nonce );
		formData.append( 'action', 'wpforms_divi_preview' );
		formData.append( 'form_id', this.props.form_id );
		formData.append( 'show_title', this.props.show_title );
		formData.append( 'show_desc', this.props.show_desc );

		fetch(
			wpforms_divi_builder.ajax_url,
			{
				method: 'POST',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Cache-Control': 'no-cache',
				},
				body: new URLSearchParams( formData ),
			},
		)
			.then( ( res ) =&gt; res.json() )
			.then(
				( result ) =&gt; {
					this.setState( {
						isLoading: false,
						form: result.data,
					} );
				},
				( error ) =&gt; {
					this.setState( {
						isLoading: false,
						error,
					} );
				},
			);
	}

	/**
	 * Render module view.
	 *
	 * @since 1.6.3
	 *
	 * @returns {JSX.Element} View for module.
	 */
	render() {
		const { error, isLoaded, form } = this.state,
			wrapperClasses = isLoaded ? 'wpforms-divi-form-preview loading' : 'wpforms-divi-form-preview';

		if ( typeof this.props.form_id === 'undefined' || this.props.form_id === '' ) {
			return (
				</p><div classname="wpforms-divi-empty-block">
					<img src="/wp-content/plugins/wpforms-lite/assets/js/integrations/divi/%7B" wpforms_divi_builder.block_empty_url alt="">

					{ <p dangerouslysetinnerhtml="{" __html: wpforms_divi_builder.block_empty_text></p> }

					<button type="button" onclick="{"> {
							window.open( wpforms_divi_builder.get_started_url, '_blank' );
						}
					}
					&gt;
						{ wpforms_divi_builder.get_started_text }
					</button>

					<p classname="wpforms-admin-no-forms-footer">
						{ wpforms_divi_builder.help_text }&nbsp;
						<a href="/wp-content/plugins/wpforms-lite/assets/js/integrations/divi/%7B" wpforms_divi_builder.guide_url onclick="{"> {
								window.open( wpforms_divi_builder.guide_url, '_blank' );
							}
						}
						&gt;
							{ wpforms_divi_builder.guide_text }.
						</a>
					</p>
				</div>
			);
		}

		if ( error || ! form ) {
			return (
				<div classname="wpforms-divi-form-placeholder">
					<img src="/wp-content/plugins/wpforms-lite/assets/js/integrations/divi/%7B" wpforms_divi_builder.placeholder alt="">
				</div>
			);
		}

		return (
			<div classname="{" wrapperclasses>
				{ <div dangerouslysetinnerhtml="{" __html: form></div> }
			</div>
		);
	}
}

jQuery( window )

	// Register custom modules.
	.on( 'et_builder_api_ready', ( event, API ) =&gt; {
		API.registerModules( [ WPFormsSelector ] );
	} )

	// Re-initialize WPForms frontend.
	.on( 'wpformsDiviModuleDisplay', () =&gt; {
		window.wpforms.init();
	} );

jQuery( document )
	.on( 'wpformsReady', function() {
		const $ = jQuery;

		// Make all the modern dropdowns disabled.
		$( '.choicesjs-select' ).each( function() {
			const $instance = $( this ).data( 'choicesjs' );

			if ( $instance &amp;&amp; typeof $instance.disable === 'function' ) {
				$instance.disable();
			}
		} );

		// Init Repeater fields.
		if ( 'undefined' !== typeof WPFormsRepeaterField ) {
			WPFormsRepeaterField.ready();
		}
	} );
</body></html>
