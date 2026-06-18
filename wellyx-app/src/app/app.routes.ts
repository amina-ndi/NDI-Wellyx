import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { IndustriesComponent } from './pages/industries/industries.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Wellyx Software Inc. | Building Scalable Software Solutions' },
  { path: 'about', component: AboutComponent, title: 'About Us | Wellyx Software Inc.' },
  { path: 'services', component: ServicesComponent, title: 'Services | Wellyx Software Inc.' },
  { path: 'products', component: ProductsComponent, title: 'Products | Wellyx Software Inc.' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Portfolio | Wellyx Software Inc.' },
  { path: 'industries', component: IndustriesComponent, title: 'Industries | Wellyx Software Inc.' },
  { path: 'contact', component: ContactComponent, title: 'Contact Us | Wellyx Software Inc.' },
  { path: 'careers', component: CareersComponent, title: 'Careers | Wellyx Software Inc.' },
  { path: 'blog', component: BlogComponent, title: 'Blog | Wellyx Software Inc.' },
  { path: '**', redirectTo: '' },
];
