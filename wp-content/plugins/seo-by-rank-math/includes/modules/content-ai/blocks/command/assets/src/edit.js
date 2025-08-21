<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>/**
 * WordPress dependencies
 */
import {
	RichText,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor'
import { useRef, useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

/**
 * Internal dependencies
 */
import hasError from '../../../../assets/src/helpers/hasError'

const getErrorMessage = () =&gt; {
	if ( ! rankMath.contentAI.isUserRegistered ) {
		return (
			
				{
					__( 'Start using Content AI by connecting your RankMath account.', 'rank-math' )
				}
				<a href="/wp-content/plugins/seo-by-rank-math/includes/modules/content-ai/blocks/command/assets/src/%7B" rankmath.connectsiteurl>{ __( 'Connect Now', 'rank-math' ) }</a>
			&gt;
		)
	}

	if ( ! rankMath.contentAI.plan ) {
		return (
			
				{
					__( 'You do not have a Content AI plan.', 'rank-math' )
				}
				<a href="https://rankmath.com/kb/how-to-use-content-ai/?play-video=ioPeVIntJWw&amp;utm_source=Plugin&amp;utm_medium=Buy+Plan+Button&amp;utm_campaign=WP">{ __( 'Choose your plan', 'rank-math' ) }</a>
			&gt;
		)
	}

	return (
		
			{
				__( 'You have exhausted your Content AI Credits.', 'rank-math' )
			}
			<a href="https://rankmath.com/kb/how-to-use-content-ai/?play-video=ioPeVIntJWw&amp;utm_source=Plugin&amp;utm_medium=Buy+Credits+Button&amp;utm_campaign=WP" target="_blank" rel="noreferrer">{ __( 'Get more', 'rank-math' ) }</a>
		&gt;
	)
}

export default ( {
	attributes,
	onReplace,
	setAttributes,
} ) =&gt; {
	const { content } = attributes
	const blockProps = useBlockProps( {
		className: 'rank-math-content-ai-command',
	} )

	const contentEditableRef = useRef( null )
	useEffect( () =&gt; {
		const { current: contentEditable } = contentEditableRef
		contentEditable.focus()

		const range = document.createRange()
		const selection = window.getSelection()
		range.selectNodeContents( contentEditable )
		range.collapse( false )
		selection.removeAllRanges()
		selection.addRange( range )
	}, [] )
	return (
		</p><div ...blockprops>
			<blockcontrols></blockcontrols>
			{
				hasError() &amp;&amp;
				<div classname="rich-text" ref="{" contenteditableref>
					{ getErrorMessage() }
				</div>
			}
			{
				! hasError() &amp;&amp;
				<richtext tagname="div" allowedformats="{" value="{" content onchange="{" newcontent> {
						return setAttributes( { content: newContent } )
					} }
					onSplit={ () =&gt; {
						return false
					} }
					onReplace={ onReplace }
					data-empty={ content ? false : true }
					isSelected={ true }
					ref={ contentEditableRef }
				/&gt;
			}
		</richtext></div>
	)
}
</body></html>
