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
  { path: '', component: HomeComponent, title: 'Noshahi Developers Inc. | Building Scalable Software Solutions' },
  { path: 'about', component: AboutComponent, title: 'About Us | Noshahi Developers Inc.' },
  { path: 'services', component: ServicesComponent, title: 'Services | Noshahi Developers Inc.' },
  { path: 'products', component: ProductsComponent, title: 'Products | Noshahi Developers Inc.' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Portfolio | Noshahi Developers Inc.' },
  { path: 'industries', component: IndustriesComponent, title: 'Industries | Noshahi Developers Inc.' },
  { path: 'contact', component: ContactComponent, title: 'Contact Us | Noshahi Developers Inc.' },
  { path: 'careers', component: CareersComponent, title: 'Careers | Noshahi Developers Inc.' },
  { path: 'blog', component: BlogComponent, title: 'Blog | Noshahi Developers Inc.' },
  { path: '**', redirectTo: '' },
];
