import 'package:bloc/bloc.dart';
import 'package:bluetooth_ecg/features/authentication/bloc/authentication_event.dart';
import 'package:bluetooth_ecg/features/authentication/bloc/authentication_state.dart';
import 'package:bluetooth_ecg/features/authentication/repository/authentication_repo.dart';
import 'package:bluetooth_ecg/features/authentication/repository/shared_pref_repo.dart';

class AuthenticationBloc extends Bloc<AuthenticationEvent, AuthenticationState> {
  AuthenticationBloc({required this.authRepository}) : super(AuthenticationInitial()) {
    on<LogInRequest>(_onLoginRequest);
    on<LogoutRequest>(_onLogoutRequest);
    on<CheckAutoLogin>(_onCheckAutoLogin);
  }
  final AuthRepository authRepository;
  void _onLoginRequest(LogInRequest event, Emitter emit) async {
    try {
      final Map? response = await authRepository.loginUser(event.email, event.password);
      if (response == null) {
        emit(AuthenticationFail());
        return;
      }
      SharedPreprerencesRepo.setDataUser(response);
      emit(AuthenticationSuccess());
    } catch (e) {
      emit(AuthenticationFail());
    }
  }

  void _onLogoutRequest(LogoutRequest event, Emitter emitter) {}
  void _onCheckAutoLogin(CheckAutoLogin event, Emitter emit) async {
    try {
      final bool hasLoggedIn = await SharedPreprerencesRepo.checkAutoLogin();
      print('logged:$hasLoggedIn');
      if (hasLoggedIn) {
        print("heheheh:${ await SharedPreprerencesRepo.getDataUser()}");

        emit(AuthenticationSuccess());
      } else {
        emit(AuthenticationInitial());
      }
    } catch (e) {
      // network error, v.v
      emit(AuthenticationFail());
    }
  }
}
