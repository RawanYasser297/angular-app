import { Routes } from '@angular/router';
import { AdminProductsPage } from './dashboard/pages/admin.products.page/admin.products.page';
import { AllProducts } from './dashboard/components/all-products/all-products';
import { CreateProductComponent } from './dashboard/components/create-product.component/create-product.component';
import { UpdateProduct } from './dashboard/components/update-product/update-product';
import { Layout as dashboardLayout } from './dashboard/layout/layout';
import { Home as HomeLayout } from './client/pages/home/home';
import { HeroSectionContent } from './dashboard/components/hero-section.content/hero-section.content';
import { ProgressDashboard } from './dashboard/components/progress-dashboard/progress-dashboard';
import { Layout } from './client/layout/layout';
import { BrandsForm } from './dashboard/components/brands-form/brands-form';
import { AdminTestimonialsPage } from './dashboard/pages/admin-testimonials-page/admin-testimonials-page';
import { ProductDetails } from './client/pages/product-details/product-details';
import { Cart } from './client/pages/cart/cart';
import { Login } from './client/pages/login/login';
import { Signup } from './client/pages/signup/signup';
import { authGuardGuard } from './core/gards/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeLayout },
      { path: 'cart', component: Cart },
      // { path: 'products', component: ProductsList },
      {
        path: 'details/:slug',
        component: ProductDetails,
        //resolve: { product: ProductionDetailsResolver },
      },
      //{ path: 'account', component: Account, canActivate: [userGuardGuard] },
    ],
  },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {
    path: 'dashboard',
    component: dashboardLayout,
    children: [
      {
        path: 'product',
        component: AdminProductsPage,
        children: [
          { path: '', component: AllProducts },
          { path: 'add', component: CreateProductComponent },
          { path: ':slug', component: UpdateProduct },
        ],
      },

      {
        path: 'content',
        children: [
          { path: 'hero', component: HeroSectionContent },
          { path: 'progress', component: ProgressDashboard },
          { path: 'brands', component: BrandsForm },
        ],
      },
      {
        path: 'testimonials',
        component: AdminTestimonialsPage,
        //canActivate: [authGuardGuard],
      },
    ],
  },
  //{path:'**',component:NotFound}
];
