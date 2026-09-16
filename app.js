/* ==========================================================================
   DESIRABLE INTER-FEEDS (PVT) LTD - INTERACTIVE PORTAL ENGINE & PDF GENERATOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initTabExplorer();
  initFormInteractivity();
  initPdfGenerator();
  initInquiryForm();
});

/* --------------------------------------------------------------------------
   1. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. DIVISION EXPLORER FILTER TABS
   -------------------------------------------------------------------------- */
function initTabExplorer() {
  const tabBtns = document.querySelectorAll('.tab-btn, .tab-nav-btn');
  const divisionCards = document.querySelectorAll('.division-card, .division-box');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-tab');

      // Update active tab button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter division cards
      let visibleCount = 0;
      divisionCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const gridContainer = document.querySelector('.division-cards-grid');
      if (gridContainer) {
        if (visibleCount % 2 !== 0) {
          gridContainer.classList.add('is-odd-count');
        } else {
          gridContainer.classList.remove('is-odd-count');
        }
        if (visibleCount === 1) {
          gridContainer.classList.add('has-single-card');
        } else {
          gridContainer.classList.remove('has-single-card');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. FORM INTERACTIVITY & PRE-SETS
   -------------------------------------------------------------------------- */
function initFormInteractivity() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yy = String(today.getFullYear()).slice(-2);

  // Set default dates
  const clientDay = document.getElementById('clientDateDay');
  const clientMonth = document.getElementById('clientDateMonth');
  const clientYear = document.getElementById('clientDateYear');

  if (clientDay && !clientDay.value) clientDay.value = dd;
  if (clientMonth && !clientMonth.value) clientMonth.value = mm;
  if (clientYear && !clientYear.value) clientYear.value = yy;

  // Toggle payment arrangement highlight
  const paymentInputs = document.querySelectorAll('input[name="paymentArrangement"]');
  paymentInputs.forEach(input => {
    input.addEventListener('change', () => {
      document.querySelectorAll('.payment-card-option, .payment-plan-card').forEach(card => {
        card.classList.remove('selected');
      });
      if (input.checked) {
        input.closest('.payment-card-option, .payment-plan-card')?.classList.add('selected');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. CLIENT-SIDE PDF GENERATOR ENGINE (PDF-LIB)
   -------------------------------------------------------------------------- */
let cachedPdfBytes = null;

const PDF_TEMPLATE_BASE64 = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YxIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKMyAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMiAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0Jhc2VGb250IC9aYXBmRGluZ2JhdHMgL05hbWUgL0YzIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNSAwIG9iago8PAovQ29udGVudHMgMTAgMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NiA4NDEuODg5OCBdIC9QYXJlbnQgOSAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNiAwIG9iago8PAovQ29udGVudHMgMTEgMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NiA4NDEuODg5OCBdIC9QYXJlbnQgOSAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNyAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDkgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9BdXRob3IgKFwoYW5vbnltb3VzXCkpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA5MTUwNzE5MzUrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA5MTUwNzE5MzUrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKFwoYW5vbnltb3VzXCkpIC9UcmFwcGVkIC9GYWxzZQo+PgplbmRvYmoKOSAwIG9iago8PAovQ291bnQgMiAvS2lkcyBbIDUgMCBSIDYgMCBSIF0gL1R5cGUgL1BhZ2VzCj4+CmVuZG9iagoxMCAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAyOTcyCj4+CnN0cmVhbQpHYiE7Zj5FZGMlJnE2SFtkOCkzMygtTUFERDBUNj05PldbdCY3Q15VO2NDKE1DXVZacU1vXT81V1Z1QUFPdGhcSV9bTVdqQTJeQ2lDcm9fLT9YTTxiYGU2LEgyPi4hYyFvUlohZjUyMHAkY1orISpRKkdKKEwjayIwMz9tPzpDWyoycWZwYEpeOz9zUkwvVykuWVVtXWI0OzI/W1RbOUpAJzRfX1FrZXJYQTtPYylnSlwvZVc2L0s7L1hwYkAxJGRkaDonSThkZS09WGdOKTgoTUksS1opViFpKzlZNTorZmxLJGpnXlYxKWw9QWVgSXUwYERMQGhpb0IuOnJaMENnRypOYkZeNEc2V2R1QUlMXmYtX0g8QURiVihSRCZqTGZBNyNYRiU5J2Y9Q1YjQXIpNG5Tc0A1PiwwQklJYWAuIlZgL0smOUM1Y1wzRHE3aE5ZUkZrMUQ/UitwbjNyPUMhIiRZU24qbGMxPFc0OykyNkssMGZAaWw4NWZoXytiO3RUaF0hKmxOQTdnK19xUnJUU1JTYSMqdEEoYTNmTyVxXnM9YWJoW05lbGdLJjZfOTZwJSNCO0RtYTgjPFIkOSsrcS5lWjYtIVE7XWZrOig3LyFkLmBjWGQlPSc5NVxvOyZjbDtyam1scU1bKmNdXihMdSkmSUVZOS9INFY6Ki8sNWZPdScvRV1oL1tVaHRbWi0xNUhMPWZfMmhKdWEqM1Fdc2U2aWktTTM5XyJOQEY/RzFiIjlbPUUkUyFLSGclSGpQKjpnLDJBP0siWEc6M3ByIlliaUU5TCtZJjUlaS9JNzhMJjgjT3VQU0h1WiZjXCZ1QUFuO1cmYiNzLWo8bSFmXzBXZFFTc1lDNk4sUyU8JmYiWmgwaT1rNSciPDgqK3NjN2woN0w2R1VaamJaVDMiPGhrcS4hJ2Y2K3AwcVJIWlVnVFooayI5bXEiW1FoViFbaElQc15TYk1YWyo0RDMiaURyb0ksPiJDbl5KQjoxR00oKz1cdUFDXjJKOW5fQCovX3FWLVIqbC81RmlJVXFoNDglLD8oYzRicUMpJjchWUhSPFgrU3VEWj1nRFJDO2olZD5vQWg+clpBYWNgRVJYO08kVy1AblwzYlEmaF1XTE0xR0Q1U2EoLFdUQ1svN0pFI0QjMlJuX2s8cG1YXGszKkFVPUNmTD87YEEiYUJoYXRMQScoZHNUNidbUytrJlg9JiQnWiQkXSNcK25eIWprLV9VQ0JhKDF0RnJJVGsiYl8sXzsldTszSlNmNTEvKC5wLThlVjhKKnNoRS10TUooKTJEW0sjXlEqVGdDJD0laio+KFJQQD5PYmRDL1gzIig+PFRTYDkhOCdpPkZHLmY4XyxiSklHTytpLkRNQTNnJ2hqMEFab0BrY0BUbmkzNjotKkM5KmEjb3ImUidDMiRQaFY0PnE7NDdEWFFCNFsnNG5hQytURFxKVV5GJmEjazk+OkI5OHNQNDlDSkcrLWNeL0xGRj5uLFopbl1yLl1OPzZlYG1EZ2hyVmg8JGw9P2w3bXBjJmRMJiheYWo+OSg9RmVtbCleZ3BCQCVrcGYwKSJxOTdxLyRqOWNHS0ssPz9nbEFoM15GT10jJzpJQDo5PS9zKnM1RTkjcSRNUjQhbzgvN0dzMCNdMDMyRF1ZczYqLEo2cl9mSG8uYF02KkU8a2ZVOzs5VG9KJEJPaUhOOU1za1hNKVg+RDVdTT9eNFQpMFBkXSxcOXNTUD5zTnIhZyRJV2lUTF49KClTRV0/KFs3PTxMcnNHZlRdIW4uIVQ5LStWVzlJKU9DUTBxI3NYNnRlbm4tInVXLmhZamA1a0BlNGYwQ1EySlZkMDYkYV4tUiM7MjUmLG5IcWFGcmgqNm88Q1hqKGVfTnVGS0FWRys0LGsidD45QCkqXVBiVkgxWzxRO2FeVCtnJXBtQ2ZYVlsuJkw6TEtcaXFTODMiTEBdM2A8Nlc5PEFZZ1c5NnNbVCtCSl0yV1s8bDZwW0RgXzwkJXNkPGdBcHMxbm9Qc2xBS28mXGhBVUBOVk5AJ043QFEuLXNKN29UUFgtS2pmL2hcZWIhKXQvV0hkcl07WGVtaEcmMyRuUT5GVFdIXFpVbFRcJFFHKFFBW2hSIUo+TiY6PSk6YFw7MDs8bD9dWFVcMl4ma1AuRVFzc0coYmYrJCtrbipiJFwjKlM8PT5CNFpJKFczVF4ySSotZ1t1MjlsJjhPJUxLKTwvZU0zK2JrWWwpb2VOW08ja10rNlBAYHAsITI+O1ouXCpYOlFFPzlXI10/ZGcxcmg6OCVVcjpcVFBDLUdGJnIlQ2A7QSdgJ0w9Lk1nSW89XXM8Rj5uSUA/SG09aUtvVHNeSGRnOzY2ZWZkJ0U3ZWlCOFtmaS5lQmk1Mi4zYkxqQTIjWTwicmNaZjRbbzxTRGEtIk1jaGc1aVpyaXJhKl0+TDxUaVBPSGlCSWYpbzVbMXF0Pz82T1gqN0NMPk48T1ZKITJdXz1BRCpsYV02UGgiMCxLRk5LOHAsaWVUYSxrSHNzaCJiZ2poU3NLMzBSTFhpKEddMlRBWEU0XlJCPS0zZDYqOW02U2ImYFI1KGElUSNobGlbbVY3NmBadSZYM0RvTnVkJE4ySHIuO1U2Pk9yOExoZjBqaklRYVROUj8+L0Q7bUZQIyNcL2poM1xIUDRbQEcyK3E6ST8zZyVrazZnXEdWI2cpKnNLRzIhVSxZKitMaT0iLi9uaFRQW0hfKTxdS1ZrTi9JUzwvLEw8MHBlXjAvMmJhO21tRUErSClLVVJ0dFBART1JPVY9OFE/cilDSG8ibnJJRFVHUHE0MmIsQ1FMV2JdSVk1RFNeMSRqWUBxV2IlPUUvYTxzMztcLC9mI0tkOlxiQmpvc1ZBc2xEa3I4bzhHZSJkIWdrLWNfZ15UUElLLUBuT0w4a0pPPEhIaisiIyslNjZLTElhOGhQWEJZZUlmW3I4SHFvaWNdSFs0XENDYDc/NXMtXWk8JHU0TS9cU051JDAwQmc6Sm82LGQsWV49JWpqOC1haVMiKzY+dWFyJDAxP0kobFUvP3NHIUhiIjVWckttQ18oVj1NYlJbZjooQiJMUGhELGJAZTBWZ0xIMUJDJyRWcjksQlojKC5JVENVPV1DZ1F0RCwqQWxGb2A3RCMiSUApQjArOGo5VldwdTRiWy9UUz5vUyU/WzhlUl1aJCwxYyRnQHRRI2M7dEgnYDVGSG5qRmZnT3MiLzM1WT04NSZJcDtYLEs1SiFbaDNnK2QzZjMpZWtqJjxWNF9sSi1WK1ArbG9nZCwiblg7UzxpWCQuQ2Q5ZDZBVSphLF5GaGBgOFg7MkAzJFhSLS41XV1WZDhTQitLODkvOF8uRyw1ZTkkIU5KMk5rVD5cMWAvYFFhVm84X08/O1lTKWUmZWMmTTRTLkhSXkA9JUVwKjlOY3AmaUJTM2tmX0hVLUpSLkwvXyI7Vy1zQk5DTmlQY05iZSYpZDpEdUdPXy4wJVJTQUxEJl4iaThZKmo2XytlX0orU0Y7M1FXaD1fN3QrMFJzWDoqYlxFXWgzb19sdCprN0F0VXMkPi9DJyUiZ0FePUpWPlJDLW5icTZeNzAtamgjNWU0ZHE/azdwLTtGZVBwQlNwJ1coYjw3SD5dOWlJUnQvWmhkaEFvcFNYKz9wO1pbLFE4QHRvW0E+KHJbOVBCPWdLJ1glKEhUJSYnU1dDSzBxUVchWzBnIlFqUEReOz0+NT4sWW5aOUpCLUBrT15GZy9rUVhkbFcobyZgPmZcYGFXSjM2cUVHTVJaKE05VXVlRl9uRStMMm1UPVRZWDhXKSg8ISlZS2lMTm4jUXAmNEI0ajlNKlM5N1w7Xi5iXlk5KGxrQio4OlUrZC9ra2AnZVdWIVxYXUglYFxkSS9xU0MyQVFQaHMkLT9va21pbCYlX0dqa19ya1RRb1BUdFkySlNwTixTJyp+PmVuZHN0cmVhbQplbmRvYmoKMTEgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMjMzMQo+PgpzdHJlYW0KR2IhO2Q+QkFkbic3SmJGZDE8ZT8kJ3BcYjJub3M/KWNFYjNKREYxJlkiRlxNIUc4K11OXmUyamIpYWw6ZDAzdD0yMFNQZXA5U085ZiViVEpGU0ckO2chbXNERD5zOHJVKiNcQ0lWRyM1Y3VNUmBDVXBnQmRXa1RNZSFqZ0RYIWA1RDMoRTtwI2VUSitEVksjamomaGppZj5ic3A6LkA+XFAyLT40LUJbPFltI2xFU1Y0M1wlU1twaFhXVWJvRityXElgUDA/akhhXmNmbzIxN2g6XzlzVHBOIyNRSlZrViIyRVpYZEJSMm4pbGsyYCZcbmZvYSRkbDcoP0c6XXJHRWlrWV5FQkRcO0ZZLWp0ImwxbGcxdC1KTl5OSiNoKUIuRlg3ZDZkTm1EUUdIYDAzLnFNV1hoOC1EVjYlNW0lSHNqPi5Pby9UbUxoUEAja3U9LzdhRTwzMDFlNEIzUzlNWWxITE1PYytNcmxDZWsqPUZWdCtzaVlMbDtPIk0sWlw+KE0rQiVHST9cYzssbjJ1TDlRRjs7WlZvODknUT0zMCMycD5eSDVsOWJeYygnZWkmNi5yailTciYhSFQqSE5yO1JgKi9mUCZoLCMnbFUwSmBKM2tRTmlTNmpQVCs5M3BIKW83SWMmQHVFUk1gYlliOUIrMU08NERSXEBiJSQvN1VAVmxMWVgxXkRibXBWJzpzYio8RG4ma2ZUSGQ/MStdKS9aVj8ub0pkTkM7NFlAQFljRz4nQEtpb18rT3NzbjEnbXRyOzMwcFEnYVk9KC9nOTNvQ0FeUCkpcnROI3VWZjdMLjM6OnBgbXVxKSlpTV9RNi5rWmddUkFWaC0pa3NjJEBHQ1xkMyliSSxKTTUtQFtwXl5dKW1tYVNZcjQnaiQ0cTBiTG1adWNdSS0yYE1wcSVEMyRkOylLLis2Syw1RSpMaTJILm03WS40UGk/M1lIOGowK0tBY0BFV1h0Pk81JS1adWRvSTFJVGdjZ2FDQWAkdT9EWUBFRFoicmBzRF0iOCc6ZG9hOTw+NV8xJmp1SGA1N3BARyhrJz5sbktELkI0K25DVW0uaVE5K0dNISpxWmVobSwybGpnSlZbdWpYa0szMCMyc2ZnJ1MocHIkPm1OaHBzaTRPaWpBYWlHVVtKYmtsVmAzMCMocihwY2E7I08rPS5XQ1hxPydKNF47QEtoVmpyU1s6NzovIV4+Rzw0Xy1HXk1iKXRKNzFtPjhIZnJdQUpBQkc2X09TcyZSNUppWSsqJj9eKFtBYzBAVTI+XDM4UWFSRkZGNCRmRUY2M2ErbloiVTFdKjJISFttQCNTIilZMkktZjBFdSUrO0JyLVIzLFIwOFEkLHAmckBOakAsXHFRUmFjdDpNVGpwcGNGSWtoSFohJT8kNCw7M0xCJ1xqZVxfbUpzJWhyVkVwXk8kMGQ1b1NYN15iVEloZl8/Kjg/M2BQOkhqVVZYdDdSZSQ3WVNqcFFaSiJISE1tOzxMbXI8WWlMXjxccVcjXiRpOWhMY11eJUVdYjRyL1hoZWksTm5zLXFhX0VdZl1xLlRXZ1hVZjtrYC5MaCVeZk0oWDUuai5GRzpVJmpoQklvISluVi9jLyJuaSNVdElOYT89NF1bXXVdNj4xOXFRYUBbNnJwYmgxUiYhckxHLnJtOUNvUTMsck5vdSRENjNRPztrRUcjMjFuMExxRG9bcEdyVjklSkVoOUhnJDg2YDdwRy9VQSklNEF0Q0MkWltwKyw5XiEoZ0k7PUw+K1IkcV1dXmFaNnRBSyIhNHBGUzNRdUJuIWVQLCNOPC9OVnQzdUpdLVNxXiR1KitLQmtjK2EkYylzMVwmOWJtSmA8Q0IiK0BrMi5ULU8kQmxcbFk3LFVrKjlbZClhUGJZJ0M9I3ApWjR1NiIjLyxwXCxQNlAqS1ZyMXQuJm1taD9tQmwsUmBSUEo7SmY6IzRTM3A6Nz85VjFodF9PPWJdXW9dJiRRc1ItMEA5OXJyPiMjOU9XM2ZvJG5QVFdLLVVQQ0hCXDgvaVUzVGNdT1hlT05jUTdTdSdrKkhbWnBYP2JDI2RiKG9QWj9RL11kLS5ZYCpUK3NmJ2RFcipaM1ZqbiloOG9NOmAiYFc6Rj9hKkgxXkEsTGMkdDdwQDJeUE89RjZ1b2x0KHBSWUhtWDVIMVQzVV0/ODM0Z10lNXBhREgjZmo1Ryk2Ky4xWXVCXmdLSGo3UmZqZ05aLEVha05sNG8pM3NLMydLKC9EWFsyLWF1dUtuNWVfUmhGXGc7NGlIYi5BK3M1QEo9QF9rQSNGVykhVklIQGlQc0JQZTJYIVJXWnNlMGk5NGlYSmZXRi9jMD1uM3NTJ25EUjNaMjVlVSgkYTs1QVhORDdiSiI2M2tEViRlNmM1QD9SM3B0RXE2Mj1yb1EmKD1ZJUxzOSNbXzsmQz9nUDckUkYwLi9EPzRoZTkjIzEpPFRhbFpidC9cdDFYRkMpKypcaUw9bWJqK0tqSjNaNEw3OmomLTk0LTlpQFU9dWVOLSU4LTNccWFkZVFWJS1lNyc/cGwpQ0tJZjxnXzI5N2hkUm5vNU5ZZEtoQUNLOkprLidYUCJpIURnKzlcKFhHaGVGXj5xN3JEI0xSZ206TidcLFRVJ2I4bm1dQ05rUV9hblRUVyRdY1dlYFUlbjdUWmIxTGgwPUJpcUQ4WSdnUXA8dD5IXFZ0KUQ8SC9fJTUhTDlzLjs6VDNbSnRVQlNvXzFQP249SklxZUxcNDU9KGZQVmNTRVBKLVxATmR0Y0c4czIiVjY5ai9BQFJadUBaXyYmImssNCc9aDJqb3FxbTxkbz1lPmYjXVo+LCIiK2ZvVmc0TVlzJyZucmlTVls3PGtFKT80I1Q2TGNKTilnbWBVXCZHPHE7IUovMmFrPVdfU00lNiZMc0MrQmM5ZHJqcGhHVWsvcz9AO2xualRLaCsyTSY+Yl9XZ102akt0YEpWMyg9W1kmI3QiVD9pY3ReTkRyMj44YTVQZVAnR2FOYidpTW9ZRyYiUDhkVWY3IUVCXC1uZT8oRlE1VW1OM0g6RWBCMXApOiUic1YlKGJRcVMhLVVTRmo8NFArKCpaZGhZW2hAQzxFcH4+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMTIKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAxMTIgMDAwMDAgbiAKMDAwMDAwMDIxOSAwMDAwMCBuIAowMDAwMDAwMzMxIDAwMDAwIG4gCjAwMDAwMDA0MTQgMDAwMDAgbiAKMDAwMDAwMDYxOCAwMDAwMCBuIAowMDAwMDAwODIyIDAwMDAwIG4gCjAwMDAwMDA4OTAgMDAwMDAgbiAKMDAwMDAwMTE3MCAwMDAwMCBuIAowMDAwMDAxMjM1IDAwMDAwIG4gCjAwMDAwMDQyOTkgMDAwMDAgbiAKdHJhaWxlcgo8PAovSUQgCls8MmNlZmY2MDUxMzQ3Y2VhZWMxOTZhNmFhNjUyMWEzMWU+PDJjZWZmNjA1MTM0N2NlYWVjMTk2YTZhYTY1MjFhMzFlPl0KJSBSZXBvcnRMYWIgZ2VuZXJhdGVkIFBERiBkb2N1bWVudCAtLSBkaWdlc3QgKG9wZW5zb3VyY2UpCgovSW5mbyA4IDAgUgovUm9vdCA3IDAgUgovU2l6ZSAxMgo+PgpzdGFydHhyZWYKNjcyMgolJUVPRgo=";

async function getPdfTemplate() {
  if (cachedPdfBytes) return cachedPdfBytes;
  
  try {
    if (window.location.protocol.startsWith('http')) {
      const response = await fetch('./Desirable_Interfeeds_Fillable_Form.pdf');
      if (response.ok) {
        cachedPdfBytes = await response.arrayBuffer();
        return cachedPdfBytes;
      }
    }
  } catch (err) {
    console.warn('HTTP fetch fallback:', err);
  }

  // Base64 decode fallback for file:// protocol
  const binaryString = window.atob(PDF_TEMPLATE_BASE64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  cachedPdfBytes = bytes.buffer;
  return cachedPdfBytes;
}

function initPdfGenerator() {
  const agreementForm = document.getElementById('agreementForm');
  const previewModal = document.getElementById('pdfModal');
  const modalClose = document.getElementById('modalClose');
  const pdfFrame = document.getElementById('pdfPreviewFrame');
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  let currentPdfBlobUrl = null;
  let currentPdfBytes = null;

  if (agreementForm) {
    agreementForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = agreementForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Generating Contract PDF...</span>';

        // Collect all form data
        const formData = {
          fullName: document.getElementById('fullName')?.value || '',
          idNumber: document.getElementById('idNumber')?.value || '',
          address: document.getElementById('address')?.value || '',
          primaryPhone: document.getElementById('primaryPhone')?.value || '',
          altPhone: document.getElementById('altPhone')?.value || '',
          email: document.getElementById('email')?.value || '',
          farmLocation: document.getElementById('farmLocation')?.value || '',
          caretakerName: document.getElementById('caretakerName')?.value || '',
          caretakerPhone: document.getElementById('caretakerPhone')?.value || '',

          // Feed Checkboxes & Quantities
          cattleFeedCheck: document.getElementById('cattleFeedCheck')?.checked,
          cattleFeedQty: document.getElementById('cattleFeedQty')?.value || '',

          pigFeedCheck: document.getElementById('pigFeedCheck')?.checked,
          pigFeedQty: document.getElementById('pigFeedQty')?.value || '',

          broilerFeedCheck: document.getElementById('broilerFeedCheck')?.checked,
          broilerFeedQty: document.getElementById('broilerFeedQty')?.value || '',

          layersFeedCheck: document.getElementById('layersFeedCheck')?.checked,
          layersFeedQty: document.getElementById('layersFeedQty')?.value || '',

          rabbitFeedCheck: document.getElementById('rabbitFeedCheck')?.checked,
          rabbitFeedQty: document.getElementById('rabbitFeedQty')?.value || '',

          goatFeedCheck: document.getElementById('goatFeedCheck')?.checked,
          goatFeedQty: document.getElementById('goatFeedQty')?.value || '',

          fishFeedCheck: document.getElementById('fishFeedCheck')?.checked,
          fishFeedQty: document.getElementById('fishFeedQty')?.value || '',

          customFeedCheck: document.getElementById('customFeedCheck')?.checked,
          customFeedQty: document.getElementById('customFeedQty')?.value || '',

          // Payment Arrangement
          paymentOption: document.querySelector('input[name="paymentArrangement"]:checked')?.value || 'deposit_cod',
          paymentOtherText: document.getElementById('paymentOtherText')?.value || '',

          // Section 4: Collateral
          collateralDesc: document.getElementById('collateralDesc')?.value || '',
          marketValue: document.getElementById('marketValue')?.value || '',
          currency: document.querySelector('input[name="currency"]:checked')?.value || 'USD',
          customCurrencyText: document.getElementById('customCurrencyText')?.value || '',
          collateralLocation: document.getElementById('collateralLocation')?.value || '',
          titleDeedNo: document.getElementById('titleDeedNo')?.value || '',

          // Section 5: Signature & Date
          clientSignName: document.getElementById('clientSignName')?.value || '',
          clientSignature: document.getElementById('clientSignature')?.value || '',
          dateDay: document.getElementById('clientDateDay')?.value || '',
          dateMonth: document.getElementById('clientDateMonth')?.value || '',
          dateYear: document.getElementById('clientDateYear')?.value || ''
        };

        // Generate filled PDF via pdf-lib
        currentPdfBytes = await generateFilledPdf(formData);
        const blob = new Blob([currentPdfBytes], { type: 'application/pdf' });

        if (currentPdfBlobUrl) {
          URL.revokeObjectURL(currentPdfBlobUrl);
        }
        currentPdfBlobUrl = URL.createObjectURL(blob);

        // Show Preview Modal
        pdfFrame.src = currentPdfBlobUrl;
        previewModal.classList.add('active');

      } catch (error) {
        console.error('PDF Generation Failed:', error);
        alert('Failed to generate pre-filled PDF contract. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // Modal Close & Download Event Handlers
  if (modalClose && previewModal) {
    modalClose.addEventListener('click', () => {
      previewModal.classList.remove('active');
    });
  }

  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      if (currentPdfBytes) {
        const blob = new Blob([currentPdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const clientName = document.getElementById('fullName')?.value.replace(/[^a-zA-Z0-9]/g, '_') || 'Client';
        link.download = `Desirable_Interfeeds_Agreement_${clientName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. PDF OVERLAY LOGIC (PDF-LIB EXACT COORDINATES)
   -------------------------------------------------------------------------- */
async function generateFilledPdf(data) {
  const templateBytes = await getPdfTemplate();

  // Load PDFLib from window object (window.PDFLib)
  const PDFLibObj = window.PDFLib || window.pdfLib;
  if (!PDFLibObj) {
    throw new Error('PDFLib library not found on window object.');
  }

  const pdfDoc = await PDFLibObj.PDFDocument.load(templateBytes);
  const pages = pdfDoc.getPages();
  const page1 = pages[0];
  const page2 = pages[1];

  const font = await pdfDoc.embedFont(PDFLibObj.StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(PDFLibObj.StandardFonts.HelveticaBold);

  const fontSize = 8.5;
  const textColor = PDFLibObj.rgb(0.03, 0.25, 0.65); // #0756B8 deep brand blue
  const checkColor = PDFLibObj.rgb(0.1, 0.6, 0.2); // Green checkmarks

  // Helper to draw text safely
  const drawText = (page, text, x, y, size = fontSize, isBold = false) => {
    if (text === undefined || text === null || text === '') return;
    const sanitized = String(text)
      .replace(/[–—]/g, '-')
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[^ -]/g, '');
    if (!sanitized) return;
    page.drawText(sanitized, {
      x,
      y,
      size,
      font: isBold ? boldFont : font,
      color: textColor
    });
  };

  const drawCheck = (page, x, y) => {
    page.drawText('X', {
      x: x + 1,
      y: y,
      size: 9.5,
      font: boldFont,
      color: checkColor
    });
  };

  /* ==================== PAGE 1 OVERLAYS ==================== */
  drawText(page1, data.fullName, 210, 646.89);
  drawText(page1, data.idNumber, 200, 617.89);
  drawText(page1, data.address, 245, 588.89);
  drawText(page1, data.primaryPhone, 225, 559.89);
  drawText(page1, data.altPhone, 115, 537.89);
  drawText(page1, data.email, 220, 511.89);
  drawText(page1, data.farmLocation, 225, 482.89);
  drawText(page1, data.caretakerName, 200, 453.89);
  drawText(page1, data.caretakerPhone, 115, 431.89);

  // Section 2: Feed Table (Column 3 starts at x=369.67, underline at y=350.5)
  const qtyColX = 380;
  if (data.cattleFeedCheck) {
    drawCheck(page1, 33, 351.89);
    drawText(page1, data.cattleFeedQty, qtyColX, 352.5);
  }
  if (data.pigFeedCheck) {
    drawCheck(page1, 33, 333.89);
    drawText(page1, data.pigFeedQty, qtyColX, 334.5);
  }
  if (data.broilerFeedCheck) {
    drawCheck(page1, 33, 315.89);
    drawText(page1, data.broilerFeedQty, qtyColX, 316.5);
  }
  if (data.layersFeedCheck) {
    drawCheck(page1, 33, 297.89);
    drawText(page1, data.layersFeedQty, qtyColX, 298.5);
  }
  if (data.rabbitFeedCheck) {
    drawCheck(page1, 33, 279.89);
    drawText(page1, data.rabbitFeedQty, qtyColX, 280.5);
  }
  if (data.goatFeedCheck) {
    drawCheck(page1, 33, 261.89);
    drawText(page1, data.goatFeedQty, qtyColX, 262.5);
  }
  if (data.fishFeedCheck) {
    drawCheck(page1, 33, 243.89);
    drawText(page1, data.fishFeedQty, qtyColX, 244.5);
  }
  if (data.customFeedCheck) {
    drawCheck(page1, 33, 225.89);
    drawText(page1, data.customFeedQty, qtyColX, 226.5);
  }

  /* ==================== PAGE 2 OVERLAYS ==================== */
  // Section 3: Payment Arrangement
  if (data.paymentOption === 'deposit_cod') {
    drawCheck(page2, 168, 670.89);
  } else if (data.paymentOption === 'installment') {
    drawCheck(page2, 286, 670.89);
  } else if (data.paymentOption === 'other') {
    drawCheck(page2, 407, 670.89);
    drawText(page2, data.paymentOtherText, 445, 670.89);
  }

  // Section 4: Collateral & Security Pledge
  drawText(page2, data.collateralDesc, 34, 598.89);
  drawText(page2, data.marketValue, 155, 569.89);

  if (data.currency === 'USD') {
    drawCheck(page2, 84, 553.89);
  } else if (data.currency === 'ZAR') {
    drawCheck(page2, 124, 553.89);
  } else if (data.currency === 'Local') {
    drawCheck(page2, 164, 553.89);
  }
  if (data.customCurrencyText) {
    drawText(page2, data.customCurrencyText, 250, 544);
  }

  drawText(page2, data.collateralLocation, 34, 511.89);
  drawText(page2, data.titleDeedNo, 215, 482.89);

  // Section 5: Signatures & Dates
  const clientName = data.clientSignName || data.fullName;
  drawText(page2, clientName, 70, 366.89);

  const signText = data.clientSignature ? `${data.clientSignature} (Signed)` : `${clientName} (Electronically Signed)`;
  drawText(page2, signText, 85, 342.89);

  // Dates
  drawText(page2, data.dateDay, 65, 318.89);
  drawText(page2, data.dateMonth, 88, 318.89);
  drawText(page2, data.dateYear, 115, 318.89);

  // Representative Stamp/Signature Auto-fill
  drawText(page2, 'Desirable Inter-Feeds Admin', 350, 366.89);
  drawText(page2, 'Desirable Official Stamp', 350, 342.89);
  drawText(page2, data.dateDay, 335, 318.89);
  drawText(page2, data.dateMonth, 358, 318.89);
  drawText(page2, data.dateYear, 385, 318.89);

  // Export filled PDF
  return await pdfDoc.save();
}

/* --------------------------------------------------------------------------
   6. FORMSPREE CORPORATE INQUIRY DISPATCH & RECAPTCHA V3
   -------------------------------------------------------------------------- */
function initInquiryForm() {
  const form = document.getElementById('corporateInquiryForm');
  const statusDiv = document.getElementById('inquiryFormStatus');
  if (!form) return;

  const RECAPTCHA_SITE_KEY = '6LdvHL8tAAAAAElM5jPlvVIIY2_PeLeDvdPXLpd9';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Dispatching Inquiry...</span>';
    if (statusDiv) {
      statusDiv.style.display = 'none';
      statusDiv.innerText = '';
    }

    try {
      // Execute Google reCAPTCHA v3
      let recaptchaToken = '';
      if (typeof grecaptcha !== 'undefined') {
        try {
          await new Promise((resolve) => grecaptcha.ready(resolve));
          recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'inquiry_submit' });
          const tokenInput = document.getElementById('g-recaptcha-response');
          if (tokenInput) tokenInput.value = recaptchaToken;
        } catch (rcErr) {
          console.warn('reCAPTCHA execution note:', rcErr);
        }
      }

      const formData = new FormData(form);
      if (recaptchaToken) {
        formData.set('g-recaptcha-response', recaptchaToken);
      }

      const response = await fetch(form.action || 'https://formspree.io/f/mrpbznba', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (statusDiv) {
          statusDiv.style.display = 'block';
          statusDiv.style.backgroundColor = 'rgba(56, 168, 62, 0.2)';
          statusDiv.style.border = '1px solid #38A83E';
          statusDiv.style.color = '#a3f3a8';
          statusDiv.innerHTML = 'Thank you! Your corporate inquiry has been logged. An executive representative will reach out shortly.';
        }
        form.reset();
      } else {
        const result = await response.json().catch(() => ({}));
        let errorMsg = 'Failed to send inquiry. Please verify your details or reach us directly via WhatsApp.';
        if (result && result.errors && result.errors.length) {
          errorMsg = result.errors.map(err => err.message).join(', ');
        }
        if (statusDiv) {
          statusDiv.style.display = 'block';
          statusDiv.style.backgroundColor = 'rgba(235, 87, 87, 0.2)';
          statusDiv.style.border = '1px solid #eb5757';
          statusDiv.style.color = '#ffb3b3';
          statusDiv.innerText = errorMsg;
        }
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.style.backgroundColor = 'rgba(235, 87, 87, 0.2)';
        statusDiv.style.border = '1px solid #eb5757';
        statusDiv.style.color = '#ffb3b3';
        statusDiv.innerText = 'Network error during transmission. Please try again or chat with us on WhatsApp.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  });
}

