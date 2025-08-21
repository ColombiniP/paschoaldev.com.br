<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>/**
 * External dependencies
 */
import { isEmpty } from 'lodash'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'
import { Button, Dashicon } from '@wordpress/components'
import { BlockControls, AlignmentToolbar, useBlockProps } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import getLink from '@helpers/getLink'
import Inspector from './components/Inspector'
import Question from './components/Question'
import generateId from '@helpers/generateId'

/**
 * Render Quetion component.
 *
 * @param {Object} props Block attributes
 *
 * @return {Array} Array of question editor.
 */
const renderQuestions = ( props ) =&gt; {
	const {
		sizeSlug,
		titleWrapper,
		titleCssClasses,
		contentCssClasses,
	} = props.attributes
	let { questions } = props.attributes
	if ( isEmpty( questions ) ) {
		questions = [
			{
				id: generateId( 'faq-question' ),
				title: '',
				content: '',
				visible: true,
			},
		]
		props.setAttributes( { questions } )
	}

	return questions.map( ( question, index ) =&gt; {
		return (
			</p><li key="{" question.id>
				<question ...question index="{" key="{" question.id questions="{" setattributes="{" props.setattributes sizeslug="{" titlewrapper="{" titlecssclasses="{" contentcssclasses="{"></question>
			</li>
		)
	} )
}

/**
 * Add an empty Question into block.
 *
 * @param {Object} props Block props.
 */
const addNew = ( props ) =&gt; {
	const questions = [ ...props.attributes.questions ]
	questions.push( {
		id: generateId( 'faq-question' ),
		title: '',
		content: '',
		visible: true,
	} )

	props.setAttributes( { questions } )
}

/**
 * FAQ block edit component.
 *
 * @param {Object} props Block props.
 */
export default ( props ) =&gt; {
	const { className, isSelected } = props
	const { textAlign } = props.attributes
	const blockProps = useBlockProps()

	return (
		<div ...blockprops>
			<div id="rank-math-faq" classname="{">
				{ isSelected &amp;&amp; <inspector ...props></inspector> }
				{ isSelected &amp;&amp; (
					<fragment>
						<blockcontrols>
							<alignmenttoolbar value="{" textalign onchange="{" nexttextalignment>
									props.setAttributes( {
										textAlign: nextTextAlignment,
									} )
								}
							/&gt;
						</alignmenttoolbar></blockcontrols>
					</fragment>
				) }

				<ul style="{" textalign>{ renderQuestions( props ) }</ul>

				<button variant="primary" onclick="{"> {
						addNew( props )
					} }
				&gt;
					{ __( 'Add New FAQ', 'rank-math' ) }
				</button>

				<a href="/wp-content/plugins/seo-by-rank-math/includes/modules/schema/blocks/faq/assets/src/%7B" getlink new faq rel="noopener noreferrer" target="_blank" title="{" __ info classname="{">
					<dashicon icon="info"></dashicon>
				</a>
			</div>
		</div>
	)
}

</body></html>
