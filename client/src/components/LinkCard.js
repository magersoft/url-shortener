import React from 'react';

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Ссылка</h2>
      <p>Short: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Long: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Количество кликов: <strong>{link.clicks}</strong></p>
      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  );
};
