const inputText = document.getElementById('input')
const content = document.getElementById('content')

const url = 'http://172.16.131.46:5530/test'

async function send(event) {
  event.preventDefault();
  const body = {
    question: inputText.value
  }

  const appendSelf = document.createElement('p')
  appendSelf.classList.add('self')
  appendSelf.innerText = inputText.value
  content.appendChild(appendSelf)
  inputText.value = ''
  content.scrollTop = content.scrollHeight

  const res = await api(body)
  const appendNode = document.createElement('p')
  appendNode.classList.add('ai')
  appendNode.innerText = res.choices[0].text.replace('\n\n', '')
  content.appendChild(appendNode)

  content.scrollTop = content.scrollHeight

  return false
}

async function api(body) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
    })
}