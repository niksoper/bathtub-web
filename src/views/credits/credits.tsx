import * as React from 'react'

import './credits.scss'

const authors: AuthorLinkProps[] = [
  { name: 'Freepik', icon: 'bath, saxophone, violin, flute, bow, guitar, bass, piano keys' },
  { name: 'Smashicons', icon: 'clarinet' },
]

export function Credits() {
  return (
    <div className="credit m-small">
      <div>
        Icons made by
        {authors.map(({ name, icon }) => (
          <AuthorLink name={name} icon={icon} />
        ))}
        from
        <a target="_blank" href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
        licensed by
        <a target="_blank" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">
          CC 3.0 BY
        </a>
      </div>
    </div>
  )
}

interface AuthorLinkProps {
  name: string
  icon: string
}

const AuthorLink = ({ name, icon }: AuthorLinkProps) => {
  const nameAndIcon = `${name} (${icon})`
  return (
    <a target="_blank" href={`https://www.flaticon.com/authors/${name.toLowerCase()}`} title={nameAndIcon}>
      {nameAndIcon}
    </a>
  )
}
