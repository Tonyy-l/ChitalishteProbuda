import { useEffect, useMemo, useState } from 'react'
<<<<<<< HEAD
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import {
  db,
  firebaseDatabaseId,
  firebaseProjectId,
  firestoreDocumentsPath,
  firestoreFilenameFilter,
  isFirebaseConfigured,
  storageDocumentsFolder,
  useStorageFallback,
  storage,
} from './firebase'
=======
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import heroImg from './assets/hero.png'
import { db } from './firebase'
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
import './App.css'

const activities = [
  {
    title: 'Библиотека',
    text: 'Книги за деца и възрастни, читателски срещи и тихо място за учене.',
  },
<<<<<<< HEAD
  
=======
  {
    title: 'Школи и клубове',
    text: 'Народни танци, музика, театър, приложни изкуства и занимания след училище.',
  },
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
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

<<<<<<< HEAD
const galleryItems = [
 {
    id: 1,
    image: "/Image.jpg",
    title: "Снимка 1",
  },
  {
    id: 2,
    image: "/Image (1).jpg",
    title: "Снимка 2",
  },
  {
    id: 3,
    image: "/Image (2).jpg",
    title: "Снимка 3",
  }
]

function DocumentsSection() {
  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFirestoreFallback, setIsFirestoreFallback] = useState(false)
  const [storageFiles, setStorageFiles] = useState([])
  const [storageError, setStorageError] = useState('')
  const [isStorageLoading, setIsStorageLoading] = useState(false)
  const documentsCollection = useMemo(() => {
    if (!db) return null
    return collection(db, firestoreDocumentsPath)
  }, [db, firestoreDocumentsPath])

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setDocuments([])
      setError('')
      setIsLoading(false)
      return undefined
    }
    if (!documentsCollection) {
      setIsLoading(false)
      return undefined
    }

    const documentsQuery = firestoreFilenameFilter
      ? query(
          documentsCollection,
          where('filename', '==', firestoreFilenameFilter),
          orderBy('createdAt', 'desc'),
        )
      : query(documentsCollection, orderBy('createdAt', 'desc'))
    let isCanceled = false

    const unsubscribe = onSnapshot(
      documentsQuery,
      (snapshot) => {
        const next = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))

        setDocuments(next)
        setIsFirestoreFallback(false)
        setError('')
        setIsLoading(false)

        // If the ordered query returns nothing but the collection isn't empty,
        // fall back to an unordered read to at least show the documents.
        if (next.length === 0) {
          ;(async () => {
            try {
              const rawSnapshot = firestoreFilenameFilter
                ? await getDocs(query(documentsCollection, where('filename', '==', firestoreFilenameFilter)))
                : await getDocs(documentsCollection)
              if (isCanceled) return
              if (rawSnapshot.size > 0) {
                setDocuments(
                  rawSnapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data(),
                  })),
                )
                setIsFirestoreFallback(true)
              }
            } catch (fallbackError) {
              if (isCanceled) return
              setError(fallbackError?.message || 'Firestore error')
            }
          })()
        }
      },
      (snapshotError) => {
        setDocuments([])
        setError(snapshotError?.message || 'Firestore error')
        setIsLoading(false)
      },
    )

    return () => {
      isCanceled = true
      unsubscribe()
    }
  }, [documentsCollection])

  useEffect(() => {
    if (!useStorageFallback) return undefined
    if (!isFirebaseConfigured || !storage) return undefined

    let isCanceled = false
    async function loadFromStorage() {
      setIsStorageLoading(true)
      try {
        const documentsRef = ref(storage, storageDocumentsFolder || 'Documents')
        const result = await listAll(documentsRef)
        const items = await Promise.all(
          result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef)
            return { name: itemRef.name, fullPath: itemRef.fullPath, url }
          }),
        )
        if (!isCanceled) {
          setStorageFiles(items)
          setStorageError('')
        }
      } catch (storageLoadError) {
        if (!isCanceled) {
          setStorageFiles([])
          setStorageError(storageLoadError?.message || 'Storage error')
        }
      } finally {
        if (!isCanceled) setIsStorageLoading(false)
      }
    }

    // Also lists files directly from Storage. Useful when "documents" are uploaded
    // to Storage but not mirrored into Firestore.
    loadFromStorage()
    return () => {
      isCanceled = true
    }
  }, [isFirebaseConfigured, useStorageFallback])

  return (
    <section className="documents-section" id="documents">
      <div className="section-heading">
        <p className="eyebrow">Публични документи на читалището</p>
        
      </div>

     

      {!isFirebaseConfigured ? (
        <p className="empty-documents">
          Firebase не е конфигуриран.
        </p>
      ) : !db ? (
        <p className="empty-documents">Няма връзка с Firestore (провери Firebase настройките).</p>
      ) : error ? (
        <p className="empty-documents">Грешка при зареждане: {error}</p>
      ) : isLoading ? (
        <p className="empty-documents">Зареждане...</p>
      ) : null}

    

    
      <div className="document-list">
        {!isFirebaseConfigured || !db || error || isLoading ? null : documents.length === 0 ? (
          <>
            <p className="empty-documents">Няма публикувани документи (Firestore).</p>
            {useStorageFallback ? (
              storageError ? (
                <p className="empty-documents">Storage грешка: {storageError}</p>
              ) : isStorageLoading ? (
                <p className="empty-documents">Зареждам файлове от Storage...</p>
              ) : storageFiles.length === 0 ? (
                <p className="empty-documents">Няма файлове в Storage папка `Documents/`.</p>
              ) : (
                storageFiles.map((file) => (
                  <article className="document-item" key={file.fullPath}>
                    <div>
                      <p>
                        Документ: <strong>{file.name}</strong>
                      </p>
                    </div>
                    <a href={file.url} target="_blank" rel="noreferrer">
                      Отвори PDF
                    </a>
                  </article>
                ))
              )
            ) : (
              <p className="empty-documents">Колекцията е празна.</p>
            )}
          </>
=======
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
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
        ) : (
          documents.map((document) => (
            <article className="document-item" key={document.id}>
              <div>
<<<<<<< HEAD
                <p>
                  <strong>{document.title || document.name || document.fileName || document.id}</strong>
                </p>
=======
                <p>ID на документа: <strong>{document.id}</strong></p>
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
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
<<<<<<< HEAD
          <a href="#gallery">Галерия</a>
=======
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
          <a href="#documents">Документи</a>
          <a href="#about">За нас</a>
          <a href="#contact">Контакт</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Народно читалище</p>
<<<<<<< HEAD
          <h1>„Пробуда - 1990г.“ пази традицията и отваря място за нови идеи.</h1>
=======
          <h1>„Пробуда“ пази традицията и отваря място за нови идеи.</h1>
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
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
<<<<<<< HEAD
          
=======
          <div className="visual-note">
            <strong>Седмична програма</strong>
            <p>школи, репетиции, срещи и празници</p>
          </div>
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
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

<<<<<<< HEAD
      <section className="section gallery-section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow">Галерия</p>
          <h2>Моменти от живота на читалището</h2>
        </div>


        <div className="gallery-grid" aria-label="Галерия">
          {galleryItems.map((item) => (
            <figure className="gallery-card" key={`${item.caption}-${item.src}`}>
               <img
        src={item.image}
        alt={item.title}
        loading="lazy"
      />
            
            </figure>
          ))}
        </div>
      </section>

=======
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
      <DocumentsSection />

      <section className="about-section" id="about">
        <div>
          <p className="eyebrow">За читалището</p>
          <h2>Културен център, който работи близо до хората.</h2>
        </div>
        <p>
<<<<<<< HEAD
          НЧ "Пробуда-1990г" развива местния културен живот чрез библиотечна дейност,
=======
          НЧ "Пробуда-1990г"развива местния културен живот чрез библиотечна дейност,
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
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
<<<<<<< HEAD
            <strong>Телефон:</strong> 0898604747
=======
            <strong>Телефон:</strong> 0888 123 456
>>>>>>> b396e9d5f87ff2ade8eb4cc2b9e67c3a9fa12b36
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
