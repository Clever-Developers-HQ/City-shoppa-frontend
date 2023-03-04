import React from 'react'
import AdminLayout from '@/components/layouts/AdminLayout'
import BrandModal from '../../components/modals/BrandModal';



function index() {
  return (
    <div>
        <AdminLayout title="Dashboard">
            <BrandModal />
        </AdminLayout>
    </div>
  )
}

export default index
