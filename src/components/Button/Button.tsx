import React from 'react'

import './styles.css'

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  content: string;
  area: string;
  category: 'number' | 'operator' | 'addition' | 'clear';
}

const Button = ({ content, area, category, onClick }: ButtonType) => {
  return (
    <button
      className="button-wrap"
      style={{
        gridArea: area,
        height: category === 'clear' ? '3.5rem' : 'auto'
      }}
      data-category={category}
      data-testid={`button-${content}`}
      onClick={onClick}
      type='button'
    >
      {content}
    </button>
  )
}

export { Button }
