import { Donation } from '../../components/Donation/Donation';
import { HeroSection } from '../../components/HeroSection/HeroSection';
import { KategoriListe } from '../../components/KategoriListe/KategoriListe';
import { ProductList } from '../../components/ProductList/ProductList';
export const HomePage = () => {

  return(
     <div> 
     <ProductList/>
     <HeroSection/>
     <KategoriListe/>
     <Donation/>
     </ div>
  )
}


