# 202012706_GSH_REACT
리액트 과제

<img src="https://user-images.githubusercontent.com/39910963/102786283-9831c300-43e2-11eb-9bd1-8d2ff0fc266f.jpg"/>

# I'M HERE 어플 (긴급구조 어플)

EXPO로 만든 프로젝트입니다.

만든 이유 : 부상, 강도 위협, 납치 등 긴급상황에서 자신의 현재 위치를 신속하게 전달하는 용도

GOOGLE 맵을 사용하여 기기의 GPS센서를 활용해 신속하게 위치를 표시해줌

자신의 위치정보를 전송할 번호 1개를 폰에 저장해놓음

SMS로 위도,경도, 위치가 기록된 구글맵 링크를 전송




## 개선할 기능

메신져 거치지 않고 문자 전송 - 원클릭 구조앱을 목적으로 만든건데 투클릭이 되버림

주기적으로 위치 전송 기능 - 폰의 메신져 앱을 거쳐야 문자가 보내지기에 주기적으로 눌러줘야해서 빠짐

번호 여러개 등록 - 없어도 되긴하는데 있어도 좋은 기능


## 사용한것

구글맵 - react-native-maps

문자 - expo-sms

내장 스토리지 저장 - react-native-async-storage/async-storage

위치 - expo-location