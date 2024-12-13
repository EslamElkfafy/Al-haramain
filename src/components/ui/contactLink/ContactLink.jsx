import React from 'react';

export function ContactLink({ type, value, label, className }) {
  const href = type === 'phone' ? `tel:${value}` : `mailto:${value}`;
  
  return (
    <a href={href} className={`${className}`}>
      {label || value}
    </a>
  );
}
