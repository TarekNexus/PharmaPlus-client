import { Oval } from 'react-loader-spinner'

export default function Loader() {
  return (
    <Oval
      height={50}
      width={50}
      color="#FF833B"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#808080"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  )
}