interface Props {
    tag: string
}
const Tag = ({tag}: Props) => {
  return (
    <div className=" bg-gray-300 px-1 rounded-sm">
      {tag}
    </div>
  )
}

export default Tag
