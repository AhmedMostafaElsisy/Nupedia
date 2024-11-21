import React from 'react';

interface TableOfContentsProps {
  sections: string[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  return (
    <nav className="text-sm">
      <ul className="space-y-2">
        {sections.map((section, index) => (
          <li key={index}>
            <a
              href={`#section-${index}`}
              className="text-blue-600 hover:underline block py-1"
            >
              {section.split(' ').slice(0, 3).join(' ')}...
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;