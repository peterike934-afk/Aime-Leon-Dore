import { useState } from "react"
import products from "../product"
import "./Collections.css"

const INITIAL_SHOW = 3
const MAX_SHOW = 8

// ── Distribute all products across 4 real ALD collection names ──
const COLLECTIONS = [
    {
        key: "ss26",
        title: "Spring / Summer 2026",
        ids: [3, 4, 25, 31, 35, 36, 16, 24, 7, 34],
    },
    {
        key: "uniform",
        title: "Uniform",
        ids: [13, 10, 11, 14, 9, 2, 32, 34],
    },
    {
        key: "technics",
        title: "ALD / New Balance",
        ids: [33, 37, 12, 7, 15, 27, 29, 26],
    },
    {
        key: "golf",
        title: "ALD Golf",
        ids: [17, 18, 19, 20, 21, 22, 23, 28, 30],
    },
]

// Build product lookup map
const productMap = {}
products.forEach(p => { productMap[p.id] = p })

function CollectionSection({ title, ids, onProductClick }) {
    const [expanded, setExpanded] = useState(false)

    const items = ids.map(id => productMap[id]).filter(Boolean)
    const visible = expanded ? items.slice(0, MAX_SHOW) : items.slice(0, INITIAL_SHOW)
    const canExpand = !expanded && items.length > INITIAL_SHOW
    const canSeeMore = expanded && items.length > MAX_SHOW

    return (
        <section className="col-section">
            {/* Header row */}
            <div className="col-section-head">
                <h2 className="col-section-title">{title}</h2>
                <button
                    className="col-view-link"
                    onClick={() => setExpanded(true)}
                >
                    view all
                </button>
            </div>

            <div className="col-divider" />

            {/* Product row */}
            <div className={`col-grid${expanded ? " col-grid--expanded" : ""}`}>
                {visible.map(product => (
                    <div
                        key={product.id}
                        className="col-card"
                        onClick={() => onProductClick(product)}
                    >
                        <div className="col-card-img">
                            <img
                                src={product.imgs[0].src}
                                alt={product.imgs[0].alt}
                            />
                        </div>
                        <div className="col-card-info">
                            <span className="col-card-name">{product.name}</span>
                            <span className="col-card-price">{product.price}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* VIEW MORE — appears after expanding past 3, when there are more than 8 */}
            {canExpand && (
                <div className="col-more-wrap">
                    <button className="col-more-btn" onClick={() => setExpanded(true)}>
                        VIEW MORE
                    </button>
                </div>
            )}
            {canSeeMore && (
                <div className="col-more-wrap">
                    <p className="col-more-note">
                        Showing {MAX_SHOW} of {items.length} — visit the full collection for more
                    </p>
                </div>
            )}
        </section>
    )
}

export default function Collections({ onProductClick }) {
    return (
        <div className="collections-page">
            {/* Page header */}
            <div className="collections-hero">
                <h1 className="collections-hero-title">Collections</h1>
            </div>

            <div className="collections-body">
                {COLLECTIONS.map(col => (
                    <CollectionSection
                        key={col.key}
                        title={col.title}
                        ids={col.ids}
                        onProductClick={onProductClick}
                    />
                ))}
            </div>
        </div>
    )
}
