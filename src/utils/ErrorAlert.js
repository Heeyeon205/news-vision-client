export default function ErrorAlert(error) {
    toast.warning('서버와 통신 중 문제가 발생했습니다.');
    console.log('Error: ', error)
}