export const Card = ({title, description}: {title: string, description: string}) => {
  const stylesByTitle = [
    {
      title: "Clientes",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon:(
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>)
    },
    {
      title: "Reservas",
      bgColor: "bg-green-500",
      textColor: "text-white",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
    },
    {
      title: "Habitaciones",
      bgColor: "bg-red-500",
      textColor: "text-white",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      )
    }
  ]

  const styles = stylesByTitle.find(style => style.title === title);
console.log(title)
  return (
    <div className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer ${styles?.bgColor} ${styles?.textColor}`}>
      <div className="mb-2">{styles?.icon}</div>
      <h2 className={`text-xl font-bold ${styles?.textColor}`}>{title}</h2>
      <p className={`text-base ${styles?.textColor}`}>{description}</p>
    </div>
  )
}