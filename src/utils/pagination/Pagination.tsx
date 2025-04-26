import React from 'react'
import ReactPaginate from 'react-paginate'
import "./pagination.css"
import { useRouter } from 'next/navigation'
import { ARTICLE_PER_PAGE } from '@/utils/consant'
const PaginationPage = ({ path, page, total }: { path: string, page: number, total: number }) => {
    const router = useRouter()
    const pageCount = total / ARTICLE_PER_PAGE
    const Clicker_Script = (number: number) => {
        router.push(`/dashboard/${path}?pageNumber=${number + 1}`)

    }
    return (
        <div className=''>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={2}
                forcePage={page - 1}
                onPageChange={(e) => Clicker_Script(e.selected)}
                breakLabel="...."
                activeClassName='red'
                nextLabel=">>"
                previousLabel="<<"
                nextClassName={`bg-blue-600 rounded-full p-2 text-white ${page === Math.ceil(pageCount) ? "opacity-50 cursor-not-allowed" : ""}`}
                previousClassName={`bg-blue-600 rounded-full p-2 text-white ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabledClassName="opacity-50 cursor-not-allowed"
                containerClassName='flex items-center p-9 gap-2 justify-center'
                pageLinkClassName='bg-gray-200 pagination-item'
                activeLinkClassName='bg-blue-500 text-white pagination-item-active'
            />

        </div>
    )
}

export default PaginationPage
