import HeroSlider from '../components/home/HeroSlider';
import BrandPillars from '../components/home/BrandPillars';
import SignatureOils from '../components/home/SignatureOils';
import PartnershipBanner from '../components/home/PartnershipBanner';
import FAQSection from '../components/home/FAQSection';
import BulkOrdersSection from '../components/home/BulkOrdersSection';

const HomePage = () => {
  return (
    <div>
      {/* 1. Hero Slider Banner */}
      <HeroSlider />


       {/* 3. Curated Signature Oils Grid */}
      <SignatureOils />



      
      {/* 4. Bulk Orders Section */}
      <BulkOrdersSection />


      

      {/* 2. Brand Purity & Trust Strip */}
      <BrandPillars />

     


      {/* 5. Bulk Orders, Collaboration & Tracking Overview Banner */}
      <PartnershipBanner />

      {/* 6. Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
};

export default HomePage;