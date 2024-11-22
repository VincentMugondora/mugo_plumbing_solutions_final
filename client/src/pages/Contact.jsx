import ContactInfo from '../components/contact/ContactInfo'
import ContactForm from '../components/contact/ContactForm'
// import Hero from '../components/contact/Hero'
import Map from '../components/contact/Map'

const Contact = () => {
  return (
    <div className='flex flex-col gap-[100px]'>
      {/* <Hero /> */}
      <ContactInfo />
      <ContactForm />
      {/* <Map /> */}
    </div>
  )
}

export default Contact
