import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuthViewModel } from "@/hooks/useAuthViewModel";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const { handleRegister, loading, error } = useAuthViewModel();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert("Pendaftaran Gagal",error);
    }
  }, [error]);

  const onRegisterPress = async () => {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim();

    if (!cleanUsername) {
      Alert.alert("Validasi Gagal", "Username wajib diisi");
      return;
    }
    if (cleanUsername.length < 3) {
      Alert.alert("Validasi Gagal", "Username minimal 3 karakter");
      return;
    }
    if (/\s/.test(cleanUsername)) {
      Alert.alert("Validasi Gagal", "Username tidak boleh mengandung spasi");
      return;
    }

    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail) {
      Alert.alert("Validasi Gagal", "Email wajib diisi");
      return;
    }
    if (!emailRegex.test(cleanEmail)) {
      Alert.alert("Validasi Gagal", "Format email salah");
      return;
    }
    if (!password) {
      Alert.alert("Validasi Gagal", "Password wajib diisi");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Validasi Gagal", "Password minimal 8 karakter");
      return;
    }

    await handleRegister(cleanUsername, cleanEmail, password);
    if (!error) {
      Alert.alert("Sukses", "Pendaftaran berhasil! Silakan login.");
      router.replace("/");
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          Daftar Akun Ternak
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Silakan isi data diri anda untuk membuat akun baru
        </ThemedText>

        <ThemedText style={styles.label}>Username</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Masukkan username"
          placeholderTextColor="#94a38b"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Masukkan email"
          placeholderTextColor="#94a38b"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Masukkan password"
          placeholderTextColor="#94a38b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onRegisterPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>Daftar Sekarang</ThemedText>
          )}
        </TouchableOpacity>
        <ThemedView style={styles.footer}>
          <ThemedText>Sudah punya akun?</ThemedText>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <ThemedText type="link" style={styles.linkText}>
              Masuk di sini
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: { padding: 16, borderRadius: 12 },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 14,
    color: "#64748b",
  },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#0f172a",
    backgroundColor: "#f8fafc",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0284c7",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#bae6fd",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "transparent",
  },
  linkText: {
    fontWeight: "600",
  },
});