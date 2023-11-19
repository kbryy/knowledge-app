import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const H2 = ({ node, ...props }) => {
  return (
    <h2 className="markdown-h2" id={node.position?.start.line.toString()}>
      {props.children}
    </h2>
  )
}

export const P = ({ ...props }) => {
  return <p className="markdown-p">{props.children}</p>
}

export const AnchorLink = ({ node, ...props }) => {
  return (
    <Link to={`#${node.position?.start.line.toString()}`}>
      {props.children}
    </Link>
  )
}

H2.propTypes = {
  node: PropTypes.object, // または PropTypes.any
  children: PropTypes.node,
}

P.propTypes = {
  node: PropTypes.object, // または PropTypes.any
  children: PropTypes.node,
}

AnchorLink.propTypes = {
  node: PropTypes.object, // または PropTypes.any
  children: PropTypes.node,
}
