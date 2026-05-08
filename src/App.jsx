import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import heroImg from './assets/hero.png'
import { db } from './firebase'
import './App.css'

const activities = [
  {
    title: 'Библиотека',
    text: 'Книги за деца и възрастни, читателски срещи и тихо място за учене.',
  },
  {
    title: 'Школи и клубове',
    text: 'Народни танци, музика, театър, приложни изкуства и занимания след училище.',
  },
  {
    title: 'Събития',
    text: 'Празници, изложби, концерти и срещи, които събират хората в общността.',
  },
]

const events = [
  ['12 май', 'Работилница за деца', 'рисуване, приказки и игри'],
  ['24 май', 'Празничен концерт', 'песни, слово и танцови състави'],
  ['7 юни', 'Лятна читалня', 'книги на открито и среща с автор'],
]

function DocumentsSection() {
  const [documents, setDocuments] = useState([])
  const documentsCollection = useMemo(() => {
    if (!db) return null
    return collection(db, 'documents')
  }, [])

  useEffect(() => {
    if (!documentsCollection) return undefined

    const documentsQuery = query(documentsCollection, orderBy('createdAt', 'desc'))
    return onSnapshot(documentsQuery, (snapshot) => {
      setDocuments(
        snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        })),
      )
    })
  }, [documentsCollection])

  return (
    <section className="documents-section" id="documents">
      <div className="section-heading">
        <p className="eyebrow">Документи</p>
        <h2>Публични документи на читалището</h2>
      </div>

      <div className="document-list">
        {documents.length === 0 ? (
          <p className="empty-documents">Няма публикувани документи.</p>
        ) : (
          documents.map((document) => (
            <article className="document-item" key={document.id}>
              <div>
                <h3>{document.title}</h3>
                <p>{document.fileName}</p>
              </div>
              <a href={document.url} target="_blank" rel="noreferrer">
                Отвори PDF
              </a>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

function App() {
  return (
    <main>
      <header className="site-header" aria-label="Основна навигация">
        <a className="brand" href="#home" aria-label="Начало">
          <span className="brand-mark">П</span>
          <span>
            <strong>НЧ "Пробуда-1990"</strong>
            <small>култура, знание, общност</small>
          </span>
        </a>
        <nav>
          <a href="#activities">Дейности</a>
          <a href="#events">Събития</a>
          <a href="#documents">Документи</a>
          <a href="#about">За нас</a>
          <a href="#contact">Контакт</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Народно читалище</p>
          <h1>„Пробуда“ пази традицията и отваря място за нови идеи.</h1>
          <p className="lead">
            Дом за книги, изкуство, сцена и срещи. Тук децата откриват първите
            си таланти, а възрастните намират жива културна общност.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#events">
              Виж програмата
            </a>
            <a className="secondary-action" href="#contact">
              Свържи се с нас
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Сцена, книги и читалищна програма">
          <div className="poster">
            <img src={heroImg} alt="" />
            <span>НЧ "Пробуда-1990г" гр.Пазарджик</span>
          </div>
          <div className="visual-note">
            <strong>Седмична програма</strong>
            <p>школи, репетиции, срещи и празници</p>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Кратка информация">
        <div>
          <strong>1990</strong>
          <span>година на основаване</span>
        </div>
        <div>
          <strong>12+</strong>
          <span>активни школи и клубове</span>
        </div>
        <div>
          <strong>4 500+</strong>
          <span>книги в библиотеката</span>
        </div>
      </section>

      <section className="section" id="activities">
        <div className="section-heading">
          <p className="eyebrow">Дейности</p>
          <h2>Място за учене, сцена и споделено време</h2>
        </div>
        <div className="activity-grid">
          {activities.map((activity) => (
            <article className="activity-card" key={activity.title}>
              <h3>{activity.title}</h3>
              <p>{activity.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="program-band" id="events">
        <div className="section-heading">
          <p className="eyebrow">Предстоящо</p>
          <h2>Събития този сезон</h2>
        </div>
        <div className="event-list">
          {events.map(([date, title, details]) => (
            <article className="event-item" key={title}>
              <time>{date}</time>
              <div>
                <h3>{title}</h3>
                <p>{details}</p>
              </div>
              <a href="#contact" aria-label={`Запитване за ${title}`}>
                Запитване
              </a>
            </article>
          ))}
        </div>
      </section>

      <DocumentsSection />

      <section className="about-section" id="about">
        <div>
          <p className="eyebrow">За читалището</p>
          <h2>Културен център, който работи близо до хората.</h2>
        </div>
        <p>
          НЧ "Пробуда-1990г"развива местния културен живот чрез библиотечна дейност,
          любителско творчество и събития за всички поколения. Сайтът може да се
          разшири с галерия, новини, онлайн записване и административни страници.
        </p>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Контакт</p>
          <h2>Елате на място или ни пишете.</h2>
        </div>
        <div className="contact-details">
          <p>
            <strong>Адрес:</strong> ул. „Бузлуджа“ 23
          </p>
          <p>
            <strong>Телефон:</strong> 0888 123 456
          </p>
          <p>
            <strong>Имейл:</strong> chitalishteprobudapz@abv.bg
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
